import get_contact_info from "../../actions/contact_info";
import ContactForm from "./ContactForm";
import SocialLinks from "./SocialLinks";

export default async function Contact() {
  const contactInfo = await get_contact_info();

  // Don't render component if no contact info data
  if (!contactInfo) {
    return null;
  }

  return (
    <section id="contact" className="section-padding">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Get In Touch</h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            {contactInfo.contactFormMessage || "I'm always interested in hearing about new opportunities and exciting projects. Let's connect!"}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6">Send a Message</h3>
            <ContactForm contactFormEnabled={contactInfo.contactFormEnabled} />
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6">Contact Information</h3>
            
            {/* Basic Contact Details */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-portfolio-blue/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-portfolio-blue" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Email</h4>
                  <a href={`mailto:${contactInfo.email}`} className="text-portfolio-blue hover:underline">
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-portfolio-blue/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-portfolio-blue" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Location</h4>
                  <p className="text-foreground/70">{contactInfo.location}</p>
                </div>
              </div>
              
              {contactInfo.phone && (
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-portfolio-blue/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-portfolio-blue" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Phone</h4>
                    <a href={`tel:${contactInfo.phone}`} className="text-portfolio-blue hover:underline">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
              )}

              {contactInfo.timezone && (
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-portfolio-blue/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-portfolio-blue" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Timezone</h4>
                    <p className="text-foreground/70">{contactInfo.timezone}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Info */}
            {contactInfo.availability && (
              <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Availability</h4>
                <p className="text-foreground/70 text-sm">{contactInfo.availability}</p>
              </div>
            )}

            {contactInfo.responseTime && (
              <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Response Time</h4>
                <p className="text-foreground/70 text-sm">{contactInfo.responseTime}</p>
              </div>
            )}

            {/* Social and Professional Links */}
            <SocialLinks 
              socialLinks={contactInfo.socialLinks}
              professionalLinks={contactInfo.professionalLinks}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
