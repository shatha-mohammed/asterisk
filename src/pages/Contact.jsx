import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { Button, Input, Textarea } from "@/components/ui";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center sm:py-24">
        <h1 className="max-w-2xl text-[28px] leading-9 font-bold text-indigo-900 sm:text-[44px] sm:leading-13">
          We'd love to hear from you
        </h1>
        <p className="text-muted max-w-xl text-base leading-7">
          Have a question, feedback, or just want to say hello? Drop us a
          message and our team will get back to you shortly.
        </p>
      </div>

      {/* Form */}
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        {isSubmitted ? (
          // Success state shown after submission
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="size-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-indigo-900">
              Message Sent!
            </h3>
            <p className="text-muted text-sm">
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Input
                label="Name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <Input
              label="Subject"
              name="subject"
              placeholder="What's this about?"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <Textarea
              label="Message"
              name="message"
              rows={5}
              placeholder="Tell us more..."
              value={formData.message}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              size="full"
              icon={<Send size={16} />}
              className="mt-2"
            >
              Send Message
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
