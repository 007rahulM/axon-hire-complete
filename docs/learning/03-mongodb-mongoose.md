# 03 — MongoDB & Mongoose

> MongoDB stores your data. Mongoose gives you a structured, type-safe way to interact with it from Node.js.

---

## What is MongoDB?

MongoDB is a **document database**. Instead of tables and rows (SQL), it has:
- **Collections** (like tables): `users`, `jobs`, `applications`
- **Documents** (like rows): JavaScript objects stored as BSON (Binary JSON)

```json
// A user document in MongoDB
{
  "_id": "ObjectId('abc123')",
  "name": "Rahul",
  "email": "rahul@gmail.com",
  "role": "recruiter",
  "skills": ["React", "Node.js"],
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Why MongoDB for Axon Hire?**
- User profiles have variable structure (some have experience, some don't)
- Job requirements are arrays — easy in MongoDB, awkward in SQL
- AI analysis results are nested objects — natural fit

---

## Mongoose: The Schema Layer

MongoDB is flexible — you can store anything. That's powerful but dangerous. Mongoose adds a schema so you define exactly what a document can contain:

```js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["user", "recruiter", "admin"], default: "user" },
  skills: { type: [String], default: [] },
});

const User = mongoose.model("User", userSchema);
```

Mongoose will:
- Reject a save if `name` is missing (`required: true`)
- Reject a save if `role` is "superuser" (not in `enum`)
- Set `role` to "user" if not provided (`default`)
- Enforce `unique` constraint at the DB level

---

## CRUD Operations in Mongoose

```js
// Create
const user = new User({ name: "Rahul", email: "r@g.com" });
await user.save();
// Or: await User.create({ name: "Rahul", email: "r@g.com" });

// Read
const user = await User.findById("abc123");
const user = await User.findOne({ email: "r@g.com" });
const users = await User.find({ role: "recruiter" });

// Update
await User.findByIdAndUpdate("abc123", { role: "recruiter" }, { new: true });
// { new: true } returns the updated document, not the old one

// Delete
await User.findByIdAndDelete("abc123");
```

---

## ObjectId — How MongoDB Identifies Documents

Every document gets a unique `_id` automatically. It's not a number — it's a 12-byte value:
```
5f43a0e7c3e4b82d1c8e4f2a
└──────────────────────┘
  - 4 bytes: timestamp (when created)
  - 5 bytes: random value
  - 3 bytes: incrementing counter
```

**This means**: You can get the creation time FROM the ObjectId without needing a `createdAt` field.

**Referencing other documents**:
```js
const applicationSchema = new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  applicantId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});
```

The `ref: "Job"` enables Mongoose's `populate()`:
```js
const app = await Application
  .findById("...")
  .populate("jobId")      // Replaces ObjectId with full Job document
  .populate("applicantId", "name email"); // Only name and email fields
```

---

## Mongoose Indexes — Making Queries Fast

See [07-performance.md](./07-performance.md) for the full deep dive. Quick summary:

```js
// Single field: fast lookup by one field
userSchema.index({ email: 1 }); // 1 = ascending, -1 = descending

// Compound: fast lookup by multiple fields + sort
jobSchema.index({ isOpen: 1, createdAt: -1 }); // Find open jobs, sorted by newest

// Unique: also enforces uniqueness at DB level
userSchema.index({ email: 1 }, { unique: true });

// Sparse: only index documents that have the field (for optional fields)
userSchema.index({ googleId: 1 }, { unique: true, sparse: true });
// Without sparse: every user WITHOUT a googleId would collide on the unique index
```

---

## Statics vs Methods on Mongoose Models

**Methods** are instance-level (on one document):
```js
userSchema.methods.isLocked = function() {
  return this.lockUntil && this.lockUntil > Date.now();
};
// Usage: if (user.isLocked()) { ... }
```

**Statics** are class-level (on the Model itself):
```js
userSchema.statics.hashToken = (raw) =>
  crypto.createHash("sha256").update(raw).digest("hex");
// Usage: User.hashToken("123456")
```

In Axon Hire, `User.hashToken()` and `User.MAX_LOGIN_ATTEMPTS` are statics — they belong to the concept of "User" but don't need a specific user instance.

---

## Common Mongoose Gotchas

### 1. `findByIdAndUpdate` doesn't run validators by default
```js
// This does NOT check the schema validators (like enum, minlength)
await User.findByIdAndUpdate(id, { role: "superuser" });

// This DOES run validators
await User.findByIdAndUpdate(id, { role: "superuser" }, { runValidators: true });
```

### 2. `save()` vs `findByIdAndUpdate`
```js
// save() runs all pre-save hooks (like hashing passwords) and validators
user.password = newPassword;
await user.save(); // Hooks run here

// findByIdAndUpdate bypasses hooks — be careful!
await User.findByIdAndUpdate(id, { password: newPassword }); // No hooks!
```

### 3. Lean queries for performance
```js
// Returns full Mongoose Document objects (with methods, tracking, etc.) — heavier
const jobs = await Job.find({ isOpen: true });

// Returns plain JavaScript objects — faster, smaller memory footprint
const jobs = await Job.find({ isOpen: true }).lean();
// Use .lean() when you only need to read data and won't call .save()
```

### 4. The `undefined` vs `null` difference
```js
user.otp = undefined; // Removes the field from the document entirely
user.otp = null;       // Sets the field to null (field exists but is null)

// Use undefined to "unset" fields (clear OTP after verification)
user.otp = undefined;
user.otpExpires = undefined;
await user.save();
```

---

## MongoDB Connection in Axon Hire

```js
// Wait for MongoDB before starting server
const serverReady = new Promise((resolve, reject) => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    await refreshSkillCache(); // Load skills into memory
    resolve();
  })
  .catch(reject);
});
```

**Why `serverReady` is a Promise**: The skill cache needs to be loaded from the DB before the server accepts requests. The Promise ensures the server only starts after MongoDB is connected AND skills are loaded.

**Why we removed the duplicate connect**: Mongoose maintains one connection pool per process. Calling `connect()` twice tries to open a second connection to the same MongoDB, wasting one of your 100 Atlas M0 connection slots.
