const Products = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">
          Our Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Protein Powders
            </h2>
            <p className="text-muted-foreground">
              Premium quality protein supplements for muscle growth and
              recovery.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Pre-Workouts
            </h2>
            <p className="text-muted-foreground">
              Energy-boosting supplements to maximize your workout performance.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Gym Equipment
            </h2>
            <p className="text-muted-foreground">
              Professional-grade training equipment for your fitness journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
