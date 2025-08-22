const Contact = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">Contact Us</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Get in Touch</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-foreground">Email</h3>
                <p className="text-muted-foreground">info@sobitas.com</p>
              </div>
              <div>
                <h3 className="font-medium text-foreground">Phone</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="font-medium text-foreground">Address</h3>
                <p className="text-muted-foreground">123 Fitness Street<br />Gym City, GC 12345</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Business Hours</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-foreground">Monday - Friday</span>
                <span className="text-muted-foreground">9:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground">Saturday</span>
                <span className="text-muted-foreground">10:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground">Sunday</span>
                <span className="text-muted-foreground">12:00 PM - 5:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;