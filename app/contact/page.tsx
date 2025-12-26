"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Send, Loader2, MessageCircle } from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["Kampala, Uganda", "Industrial Area"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+256 700 000 000", "+256 780 000 000"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["gear@9yards.co.ug", "bookings@9yards.co.ug"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Fri: 8AM - 6PM", "Sat: 9AM - 3PM"],
  },
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSubmitted(true)
    setIsSubmitting(false)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero */}
        <section className="bg-card border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 text-center">
            <h1 className="text-4xl gradient-heading mb-4">Get in Touch</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about our equipment or rental process? We&apos;re here to help you find the perfect gear
              for your production.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Info Cards */}
              <div className="lg:col-span-1 space-y-4">
                {contactInfo.map((item) => (
                  <Card key={item.title} className="bg-card border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                          {item.details.map((detail, i) => (
                            <p key={i} className="text-sm text-muted-foreground">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Quick Links */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                        <MessageCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Need Quick Help?</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Chat with us on WhatsApp for immediate assistance with your booking.
                        </p>
                        <Button asChild size="sm" variant="outline" className="bg-transparent">
                          <a
                            href="https://wa.me/256783791730"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center"
                          >
                            WhatsApp Us
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="bg-card border-border">
                  <CardContent className="p-6 lg:p-8">
                    {submitted ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                          <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-semibold text-foreground mb-2">Message Sent!</h3>
                        <p className="text-muted-foreground mb-6">
                          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                        </p>
                        <Button onClick={() => setSubmitted(false)}>Send Another Message</Button>
                      </div>
                    ) : (
                      <>
                        <h2 className="text-2xl font-semibold text-foreground mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input
                                id="name"
                                required
                                placeholder="Your name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="+256 700 000 000"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              required
                              placeholder="stuartmuyambi@gmail.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Select
                              value={formData.subject}
                              onValueChange={(value) => setFormData({ ...formData, subject: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="What's this about?" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="rental-inquiry">Rental Inquiry</SelectItem>
                                <SelectItem value="booking-help">Booking Help</SelectItem>
                                <SelectItem value="equipment-question">Equipment Question</SelectItem>
                                <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                                <SelectItem value="feedback">Feedback</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                              id="message"
                              required
                              placeholder="Tell us how we can help..."
                              className="min-h-37.5"
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />
                          </div>

                          <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 h-4 w-4" />
                                Send Message
                              </>
                            )}
                          </Button>
                        </form>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
