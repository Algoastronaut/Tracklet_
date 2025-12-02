"use client";

import { useState, useEffect } from "react";
import { submitContactForm } from "@/actions/contact";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, MessageSquare, User } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const {
    loading,
    fn: submitForm,
    data: result,
  } = useFetch(submitContactForm);

  // Handle success
  useEffect(() => {
    if (result?.success && !loading) {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
    }
  }, [result, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    await submitForm({ name, email, message });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-5 py-12 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question or feedback? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <Card className="border border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-3 text-gray-900">
                  <div className="p-2 rounded-lg bg-violet-100">
                    <Mail className="h-5 w-5 text-violet-600" />
                  </div>
                  Email Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Send us an email anytime and we&apos;ll respond within 24 hours.
                </p>
                <a
                  href="mailto:support@tracklet.com"
                  className="text-violet-600 hover:text-violet-700 text-sm font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  support@tracklet.com
                  <Mail className="h-3.5 w-3.5" />
                </a>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-3 text-gray-900">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  Quick Response
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-gradient-to-br from-violet-50 to-blue-50 shadow-lg">
              <CardContent className="pt-6">
                <p className="text-sm text-gray-700 font-medium">
                  💡 <span className="font-semibold">Tip:</span> For faster response, include as much detail as possible in your message.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="border border-gray-200 bg-white shadow-xl">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-xl text-gray-900">Send us a message</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Fill out the form below and we&apos;ll get back to you soon.</p>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={loading}
                    className="border-gray-300 focus:border-violet-500 focus:ring-violet-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="border-gray-300 focus:border-violet-500 focus:ring-violet-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-gray-500" />
                    Message
                  </label>
                  <Textarea
                    placeholder="Tell us what's on your mind..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    disabled={loading}
                    rows={6}
                    className="border-gray-300 focus:border-violet-500 focus:ring-violet-500 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold h-11 shadow-md hover:shadow-lg transition-all"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

