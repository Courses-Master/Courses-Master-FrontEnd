import z from "zod";

export const eventSchema = z.object({
    event_name: z.string().nonempty("Event Name is required"),
    event_date: z.string().nonempty("Event Date is required"),
    event_venue: z.string().nonempty("Event Venue is required"),
    event_time: z.string().nonempty("Event Time is required"),
    description: z.string().nonempty("Description is required"),
    ticket_price: z.number().min(1, { message: "Ticket Price is required" }),
    seat_amount: z.number().min(1, { message: "Seat Amount is required" }),
    available_seats: z.number().min(1, { message: "Available Seats is required" }),
    popularity: z.string().nonempty("Popularity is required"),
    tags: z.string().nonempty("Tags are required"),
    expected_attendance: z.string().nonempty("Expected Attendance is required"),
});
