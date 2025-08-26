import { get_footer_heading } from "../../actions/Headings_class";

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  
  try {
    const footerHeading = await get_footer_heading();
    
    if (!footerHeading) {
      return null;
    }
    
    return (
      <footer className="bg-card border-t border-border">
        <div className="container-max">
          <div className="flex flex-col md:flex-row items-center justify-between py-8">
            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-foreground/60">
                {`© ${currentYear} ${footerHeading}`}
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  } catch {
    // Don't render footer when API fails
    return null;
  }
}
