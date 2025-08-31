import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useKV } from '@github/spark/hooks';
import { toast } from 'sonner';
import { Envelope, Phone, MapPin, LinkedinLogo, GithubLogo, TwitterLogo } from '@phosphor-icons/react';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSection = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissions, setSubmissions] = useKV<ContactForm[]>('contact-submissions', []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.message) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Save submission
      setSubmissions(current => [...current, { ...formData }]);

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      toast.success('Message sent successfully! I\'ll get back to you soon.');
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Let's Connect</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Whether you have a project in mind, want to discuss a potential collaboration, 
                or simply want to say hello, I'd love to hear from you. Feel free to reach out 
                through any of the channels below.
              </p>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Envelope size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Email</h4>
                  <p className="text-muted-foreground">your.email@example.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Phone</h4>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Location</h4>
                  <p className="text-muted-foreground">San Francisco, CA</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-medium text-foreground mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" className="rounded-full">
                  <LinkedinLogo size={20} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <GithubLogo size={20} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <TwitterLogo size={20} />
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send me a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project or just say hello..."
                    rows={5}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;