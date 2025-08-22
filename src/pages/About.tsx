const About = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">About Sobitas</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Sobitas is your premier destination for high-quality fitness supplements and gym equipment. 
            We are passionate about helping you achieve your fitness goals with products that deliver real results.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Our commitment to excellence drives us to source only the finest ingredients and equipment, 
            ensuring that every product meets our rigorous standards for quality and effectiveness.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Join thousands of satisfied customers who trust Sobitas for their fitness journey. 
            Experience the difference that quality makes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;