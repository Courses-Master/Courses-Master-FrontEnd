import { z } from "zod";
export const CourseSchema = z.object({
  title: z.string().min(2, "Course title is required"),
  price: z.coerce.number().min(2, "Price must be a  number"),
  instructor: z.string().min(2, "Instructor is required"),
  description: z.string().min(10, "Description is required"),
  courseImage:z.file("image is required"),
});