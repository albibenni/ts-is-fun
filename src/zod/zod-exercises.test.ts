// tests/zod-challenges.test.ts
import { describe, it, expect } from "vitest";
import { z } from "zod/v4";

describe("Basic Zod (Exercises)", () => {
  /**
   *
   * CHALLENGE 1: Basic Validation
   *
   * - Object with { name: string, age: number >= 0 }
   */
  const basicUserSchema = z.object({
    name: z.string(),
    age: z.number().int().positive(),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type User = z.infer<typeof basicUserSchema>; // example of zod usage for inferring types

  describe("Challenge 1: Basic Validation", () => {
    it("should pass valid data", () => {
      const result = basicUserSchema.parse({ name: "Ada", age: 36 });
      expect(result).toEqual({ name: "Ada", age: 36 });
    });

    it("should fail if age is missing", () => {
      // parse() should throw an error
      expect(() => basicUserSchema.parse({ name: "Charles" })).toThrowError();
    });

    it("should fail if age is negative", () => {
      expect(() =>
        basicUserSchema.parse({ name: "Bobby", age: -1 }),
      ).toThrowError();
    });
  });

  /**
   *
   * CHALLENGE 2: All About Options
   *
   * - name: string
   * - age: optional number >= 0
   *   - If age missing, default to 0 (or you might just allow undefined).
   *
   */
  const optionalAgeSchema = z.object({
    name: z.string(),
    // age: z.number().gte(0).optional().default(0),
    age: z.number().min(0).optional().default(0),
  });

  describe("Challenge 2: Optional Age", () => {
    it("should pass with explicit age", () => {
      const data = { name: "Ada", age: 36 };
      const result = optionalAgeSchema.parse(data);
      expect(result).toEqual({ name: "Ada", age: 36 });
    });

    it("should pass without age (and default to 0)", () => {
      const data = { name: "Ada" };
      const result = optionalAgeSchema.parse(data);
      expect(result).toEqual({ name: "Ada", age: 0 });
    });

    it("should fail if age is negative", () => {
      expect(() =>
        optionalAgeSchema.parse({ name: "Test", age: -1 }),
      ).toThrowError();
    });
  });

  /**
   *
   * CHALLENGE 3: Nested Objects, Arrays
   *
   * - { name: string, addresses: Array<{ street, city, zip, apartmentNumber? }> }
   * - Must have at least one address in the array
   *
   */
  const addressSchema = z.object({
    street: z.string(),
    city: z.string(),
    zip: z.string(),
    apartmentNumber: z.string().optional(),
  });

  const userProfileSchema = z.object({
    name: z.string(),
    // addresses: z.array(addressSchema).min(1),
    addresses: z.array(addressSchema).nonempty(),
  });

  describe("Challenge 3: Nested Objects and Arrays", () => {
    it("should pass with one valid address", () => {
      const data = {
        name: "Grace Hopper",
        addresses: [
          { street: "123 Naval Dr", city: "Arlington", zip: "76010" },
        ],
      };
      expect(() => userProfileSchema.parse(data)).not.toThrow();
    });

    it("should pass with multiple addresses, including optional apartmentNumber", () => {
      const data = {
        name: "Grace Hopper",
        addresses: [
          { street: "123 Naval Dr", city: "Arlington", zip: "76010" },
          {
            street: "456 Code Ave",
            city: "Boston",
            zip: "02108",
            apartmentNumber: "Apt 101",
          },
        ],
      };
      expect(() => userProfileSchema.parse(data)).not.toThrow();
    });

    it("should fail if addresses array is empty", () => {
      const data = { name: "No Addresses", addresses: [] };
      expect(() => userProfileSchema.parse(data)).toThrowError();
    });
  });

  /**
   *
   * CHALLENGE 4: Unions
   *
   * - Accept either "anonymous" (string literal)
   * - Or an object { id: number, name: string }
   *
   */

  const userSchema = z.object({
    id: z.number(),
    name: z.string(),
  });
  const anonymousSchema = z.literal("anonymous");
  const userIdentitySchema = z.union([userSchema, anonymousSchema]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type ThisUser = z.infer<typeof userIdentitySchema>;

  describe("Challenge 4: Union Types", () => {
    it("should accept the string 'anonymous'", () => {
      const result = userIdentitySchema.parse("anonymous");
      expect(result).toBe("anonymous");
    });

    it("should accept an object {id, name}", () => {
      const data = { id: 1, name: "Alan" };
      const result = userIdentitySchema.parse(data);
      expect(result).toEqual({ id: 1, name: "Alan" });
    });

    it("should fail if id is not a number", () => {
      const data = { id: "wrong", name: "Marvin" };
      expect(() => userIdentitySchema.parse(data)).toThrowError();
    });
  });

  /**
   *
   * CHALLENGE 5: Refining Your Tastes
   *
   * - numeric field, must be prime
   *
   */
  function isPrime(num: number): boolean {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }
  const primeNumberSchema = z
    .number()
    .refine(isPrime, { message: "Quantity must be prime!" });

  describe("Challenge 5: Refinements (Prime Number)", () => {
    it("should pass for a prime number (5)", () => {
      expect(() => primeNumberSchema.parse(5)).not.toThrow();
    });

    it("should fail for a non-prime number (10)", () => {
      expect(() => primeNumberSchema.parse(10)).toThrowError(
        "Quantity must be prime!",
      );
    });
  });

  /**
   *
   * CHALLENGE 6: Transform
   *
   * - string in YYYY-MM-DD format -> transform into Date
   *
   */
  const dateStringSchema = z.string().transform((date: string) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      throw new Error("Invalid date string");
    }
    return d;
  });

  describe("Challenge 6: Transform to Date", () => {
    it("should transform a valid string to a Date", () => {
      const result = dateStringSchema.parse("2025-12-31");
      expect(result).toBeInstanceOf(Date);
      expect(result.toISOString()).toContain("2025-12-31");
    });

    it("should fail with invalid date string", () => {
      expect(() => dateStringSchema.parse("not-a-date")).toThrowError(
        "Invalid date string",
      );
    });
  });

  /**
   *
   * CHALLENGE 7: Branding
   *
   * - userIdSchema = z.string().uuid().brand<"UserId">()
   *
   */
  const userIdSchema = z.string().uuid().brand<"UserId">();
  type UserId = z.infer<typeof userIdSchema>; // string & { __brand: "UserId" }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const x: UserId = "lol"; // ERROR - must be id

  describe("Challenge 7: Branded UUID", () => {
    it("should pass a valid UUID", () => {
      const validUuid = "7c45ae8a-cf6e-4f72-b12f-6fbb21ce3ab9";
      const userId = userIdSchema.parse(validUuid);
      expect(userId).toBe(validUuid);
    });

    it("should fail an invalid UUID", () => {
      expect(() => userIdSchema.parse("not-a-uuid")).toThrowError();
    });
  });

  /**
   *
   * CHALLENGE 8: partial, pick, omit
   *
   * We'll reuse a "fullUserSchema" and create partial/picked/omitted versions
   */
  const address_schema = z.object({
    street: z.string(),
    city: z.string(),
    zip: z.string(),
  });

  const fullUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phoneNumber: z.string().nonempty(),
    addresses: z.array(address_schema).nonempty(),
  });

  const partialUserUpdateSchema = fullUserSchema.partial();
  const publicProfileSchema = fullUserSchema.pick({
    name: true,
    addresses: true,
  });

  const userWithoutEmailSchema = fullUserSchema.omit({
    email: true,
  });

  describe("Challenge 8: partial, pick, omit", () => {
    const sampleData = {
      name: "Test User",
      email: "test@example.com",
      phoneNumber: "123-456-7890",
      addresses: [{ street: "100 Test Ln", city: "Nowhere", zip: "99999" }],
    };

    it("should allow partial updates (all fields optional)", () => {
      const partialData = { phoneNumber: "987-654-3210" };
      const parsed = partialUserUpdateSchema.parse(partialData);
      expect(parsed).toEqual(partialData);
    });

    it("should pick only name and addresses for the public profile", () => {
      const parsed = publicProfileSchema.parse(sampleData);
      expect(parsed).toEqual({
        name: "Test User",
        addresses: [{ street: "100 Test Ln", city: "Nowhere", zip: "99999" }],
      });
    });

    it("should omit email from user data", () => {
      const parsed = userWithoutEmailSchema.parse(sampleData);
      // email is removed
      expect(parsed).toEqual({
        name: "Test User",
        phoneNumber: "123-456-7890",
        addresses: [{ street: "100 Test Ln", city: "Nowhere", zip: "99999" }],
      });
    });
  });

  /**
   *
   * CHALLENGE 9: z.custom()
   *
   * - Validate hex color string (#FFF or #FFFFFF, etc.)
   */
  const hexColorSchema = z.custom<string>(
    (value) => {
      if (typeof value !== "string") {
        return false;
      }
      // Check if it starts with # and has either 3 or 6 hex characters after
      const hexRegex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;
      return hexRegex.test(value);
    },
    {
      message: "Invalid hex color",
    },
  );

  describe("Challenge 9: Custom (Hex Color)", () => {
    it("should pass #FFF", () => {
      expect(() => hexColorSchema.parse("#FFF")).not.toThrow();
    });

    it("should pass #ffffff", () => {
      expect(() => hexColorSchema.parse("#ffffff")).not.toThrow();
    });

    it("should fail 'FFF' (missing #)", () => {
      expect(() => hexColorSchema.parse("FFF")).toThrowError(
        "Invalid hex color",
      );
    });

    it("should fail #FFFFF (5 hex digits)", () => {
      expect(() => hexColorSchema.parse("#FFFFF")).toThrowError(
        "Invalid hex color",
      );
    });
  });

  /**
   *
   * CHALLENGE 10: Full Form Validator
   *
   * - username (4-16 chars)
   * - password (>=8 chars, at least 1 digit)
   * - email (valid email)
   * - birthDate (optional, if present must be valid date and transformed to Date)
   */
  const usernameSchema = z.string().min(4).max(16);

  const passwordSchema = z
    .string()
    .min(8)
    .refine((val) => /\d/.test(val), { message: "Must contain a digit" });

  const emailSchema = z.email();

  const birthDateSchema = z
    .string()
    .optional()
    .transform((val) => {
      if (val) {
        const date = new Date(val);
        if (isNaN(date.getTime())) {
          throw new Error("Not a date");
        }
        return date;
      }
    });

  const registrationFormSchema = z.object({
    username: usernameSchema,
    password: passwordSchema,
    email: emailSchema,
    birthDate: birthDateSchema,
  });

  describe("Challenge 10: Full Form Validator", () => {
    it("should pass valid form data", () => {
      const validFormData = {
        username: "myuser",
        password: "secret123",
        email: "test@example.com",
        birthDate: "1985-01-01",
      };
      const parsed = registrationFormSchema.parse(validFormData);
      expect(parsed.username).toBe("myuser");
      expect(parsed.password).toBe("secret123");
      expect(parsed.email).toBe("test@example.com");
      expect(parsed.birthDate).toBeInstanceOf(Date);
    });

    it("should fail invalid form data", () => {
      const invalidFormData = {
        username: "me", // too short
        password: "nopass", // no digit, not enough length
        email: "not-an-email", // invalid email
        birthDate: "not-a-date", // invalid date
      };
      expect(() =>
        registrationFormSchema.parse(invalidFormData),
      ).toThrowError();
    });
    it("should fail invalid password", () => {
      const invalidFormData = {
        username: "meUser",
        password: "nopass", // no digit, not enough length
        email: "ex@some.com",
        birthDate: "2025-01-02",
      };
      expect(() => registrationFormSchema.parse(invalidFormData)).toThrowError(
        "Must contain a digit",
      );
    });
  });
});
