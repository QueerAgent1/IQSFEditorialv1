import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  membershipTier: text("membership_tier").notNull().default("Community"), // Community, Advocate, Partner, Enterprise
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const countries = pgTable("countries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  code: text("code").notNull().unique(), // ISO country code
  region: text("region").notNull(), // Africa, Americas, Asia, Europe, Oceania
  safetyScore: integer("safety_score").notNull(), // 0-100
  trend: text("trend").notNull(), // improving, declining, stable
  latitude: decimal("latitude", { precision: 10, scale: 6 }),
  longitude: decimal("longitude", { precision: 10, scale: 6 }),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

export const certifications = pgTable("certifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationName: text("organization_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  country: text("country").notNull(),
  organizationSize: text("organization_size").notNull(), // 1-49, 50-249, 250-999, 1000+
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  level: text("level").default("bronze"), // bronze, silver, gold
  verificationId: text("verification_id").unique(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reports = pgTable("reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  type: text("type").notNull(), // country, regional, global, custom
  countries: text("countries").array(),
  format: text("format").notNull(), // pdf, excel, json
  content: jsonb("content"),
  downloadUrl: text("download_url"),
  generatedBy: text("generated_by"), // user id
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const memberships = pgTable("memberships", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull().references(() => users.id),
  plan: text("plan").notNull(), // Community, Advocate, Partner, Enterprise
  status: text("status").notNull().default("active"), // active, cancelled, expired
  startDate: timestamp("start_date").defaultNow().notNull(),
  endDate: timestamp("end_date"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertCountrySchema = createInsertSchema(countries).omit({
  id: true,
  lastUpdated: true,
});

export const insertCertificationSchema = createInsertSchema(certifications).omit({
  id: true,
  createdAt: true,
  status: true,
  verificationId: true,
});

export const insertReportSchema = createInsertSchema(reports).omit({
  id: true,
  createdAt: true,
  downloadUrl: true,
});

export const insertMembershipSchema = createInsertSchema(memberships).omit({
  id: true,
  startDate: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Country = typeof countries.$inferSelect;
export type InsertCountry = z.infer<typeof insertCountrySchema>;
export type Certification = typeof certifications.$inferSelect;
export type InsertCertification = z.infer<typeof insertCertificationSchema>;
export type Report = typeof reports.$inferSelect;
export type InsertReport = z.infer<typeof insertReportSchema>;
export type Membership = typeof memberships.$inferSelect;
export type InsertMembership = z.infer<typeof insertMembershipSchema>;
