import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Envelope, Phone, MapPin, LinkedinLogo, GithubLogo, InstagramLogo, WhatsappLogo } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const ContactSection = () => {
  const { t } = useTranslation();

  const bookingUrl: string | undefined = (import.meta as any).env?.VITE_BOOKING_URL;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('adityahusni90@gmail.com');
      toast.success('Email copied to clipboard');
    } catch {
      toast.error('Unable to copy. Please copy manually.');
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">{t('contact.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">{t('contact.connect')}</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {t('contact.connectDescription')}
              </p>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Envelope size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{t('contact.email')}</h4>
                  <p className="text-muted-foreground">adityahusni90@gmail.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{t('contact.phone')}</h4>
                  <p className="text-muted-foreground">+62 851-5648-0762</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{t('contact.location')}</h4>
                  <p className="text-muted-foreground">Surabaya, Jawa Timur</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-medium text-foreground mb-4">{t('contact.followMe')}</h4>
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full hover:bg-red-50 hover:border-red-300"
                  onClick={() => window.open('mailto:adityahusni90@gmail.com', '_blank')}
                >
                  <Envelope size={20} className="text-red-600" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full hover:bg-purple-50 hover:border-purple-300"
                  onClick={() => window.open('tel:+6285156480762', '_blank')}
                >
                  <Phone size={20} className="text-purple-600" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full hover:bg-blue-50 hover:border-blue-300"
                  onClick={() => window.open('https://www.linkedin.com/in/husni-aditya-5b9065123/', '_blank')}
                >
                  <LinkedinLogo size={20} className="text-blue-600" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full hover:bg-gray-50 hover:border-gray-400"
                  onClick={() => window.open('https://github.com/husniaditya', '_blank')}
                >
                  <GithubLogo size={20} className="text-gray-800" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full hover:bg-green-50 hover:border-green-400"
                  onClick={() => {
                    const phoneNumber = "+6285156480762";
                    const message = "Hi Husni! I found your portfolio and would like to connect.";
                    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                >
                  <WhatsappLogo size={20} className="text-green-600" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full hover:bg-pink-50 hover:border-pink-400"
                  onClick={() => window.open('https://instagram.com/husniadityaa', '_blank')}
                >
                  <InstagramLogo size={20} className="text-pink-600" />
                </Button>
                {/* Actions with text */}
                <Button 
                  variant="secondary"
                  onClick={handleCopyEmail}
                  className="rounded-full"
                >
                  Copy email
                </Button>
                {bookingUrl && (
                  <Button 
                    variant="default"
                    onClick={() => window.open(bookingUrl, '_blank')}
                    className="rounded-full"
                  >
                    Book a call
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* WhatsApp Contact */}
          <Card>
            <CardHeader>
              <CardTitle>{t('contact.whatsapp.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <WhatsappLogo size={40} className="text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {t('contact.whatsapp.ready')}
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {t('contact.whatsapp.description')}
                </p>
                <Button 
                  onClick={() => {
                    const phoneNumber = "+6285156480762";
                    const message = "Hi Husni! I'm interested in discussing a project with you.";
                    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg font-medium"
                  size="lg"
                >
                  <WhatsappLogo size={24} className="mr-2" />
                  {t('contact.whatsapp.button')}
                </Button>
              </div>
              
              <div className="border-t pt-6">
                <p className="text-sm text-muted-foreground text-center">
                  {t('contact.whatsapp.alternative')}
                </p>
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                  <Button variant="outline" onClick={handleCopyEmail}>Copy email</Button>
                  {bookingUrl && (
                    <Button onClick={() => window.open(bookingUrl, '_blank')}>Book a call</Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;