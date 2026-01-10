"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Send, Loader2, CheckCircle, MapPin, Clock, Phone } from "lucide-react"

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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSubmitted(true)
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent -z-10" />
        <div className="absolute top-40 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />

        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* Left Column: Headline & Direct Contact */}
            <div className="space-y-8 lg:sticky lg:top-32">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight gradient-heading">
                  Let's Talk About <br />
                  Your Production.
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                  Whether you need a custom quote, technical advice, or help with a booking, 
                  our team of film professionals is ready to assist you.
                </p>
              </div>

              <div className="flex justify-center">
                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg border-primary/20 hover:bg-primary/5">
                  <a href="mailto:gear@9yards.co.ug">
                    <Mail className="mr-2 h-5 w-5" />
                    Email Support
                  </a>
                </Button>
              </div>

            </div>

            {/* Right Column: Contact Form */}
            <div className="relative">
              <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-primary" />
                <CardContent className="p-6 lg:p-10">
                  {submitted ? (
                    <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground mb-8 text-lg">
                        Thank you for reaching out. A team member will get back to you within 24 hours.
                      </p>
                      <Button variant="outline" size="lg" onClick={() => setSubmitted(false)}>
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-foreground mb-1">Send a Message</h2>
                        <p className="text-muted-foreground">We usually respond within 2 hours during business hours.</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                            <Input
                              id="name"
                              required
                              placeholder="Full Name"
                              className="bg-background/50 border-border/50 h-12"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                            <Input
                              id="phone"
                              type="tel"
                              required
                              placeholder="+256 7xx xxx xxx"
                              className="bg-background/50 border-border/50 h-12"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            placeholder="john@example.com"
                            className="bg-background/50 border-border/50 h-12"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject" className="text-sm font-medium">What can we help with?</Label>
                          <Select
                            value={formData.subject}
                            onValueChange={(value) => setFormData({ ...formData, subject: value })}
                          >
                            <SelectTrigger className="bg-background/50 border-border/50 h-12">
                              <SelectValue placeholder="Select a topic" />
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
                          <Label htmlFor="message" className="text-sm font-medium">Message Details</Label>
                          <Textarea
                            id="message"
                            required
                            placeholder="Tell us about your project or what gear you're looking for..."
                            className="min-h-[160px] bg-background/50 border-border/50 resize-none"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          />
                        </div>

                        <Button type="submit" size="lg" className="w-full h-14 text-lg font-semibold" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-5 w-5" />
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
      </main>
    </div>
  )
}
