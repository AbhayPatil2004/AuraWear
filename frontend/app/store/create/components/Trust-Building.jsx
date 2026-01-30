function TrustBuildingSection() {
  return (
    <section className="mb-10 rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8">

      {/* Header */}
      {/* <div className="mb-8 max-w-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Open your store on <span className="text-black">AURAStore</span>
        </h2>
        <p className="mt-2 text-gray-600">
          Start your online store in minutes. We handle the tech, payments, and
          security — so you can focus on selling.
        </p>
      </div> */}

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <div className="group rounded-2xl bg-white border border-gray-200 p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/5 text-2xl">
              🔒
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Safe & Verified Marketplace
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                All stores are reviewed to ensure trust, security, and a safe
                buying experience.
              </p>
            </div>
          </div>
        </div>

        <div className="group rounded-2xl bg-white border border-gray-200 p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/5 text-2xl">
              💸
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Zero Cost to Get Started
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                No setup fees or monthly charges. Pay only when you receive
                orders.
              </p>
            </div>
          </div>
        </div>

        <div className="group rounded-2xl bg-white border border-gray-200 p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/5 text-2xl">
              🏪
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Your Store, Your Brand
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Create a branded store with your logo, banner, and product
                listings.
              </p>
            </div>
          </div>
        </div>

        <div className="group rounded-2xl bg-white border border-gray-200 p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/5 text-2xl">
              🇮🇳
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Made for Indian Sellers
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Indian payments, local addresses, and seller-first customer
                support.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Trust Strip */}
      <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5">
        <p className="text-sm text-gray-700">
          🚀 <span className="font-medium text-gray-900">Don’t worry:</span> You
          can edit store details, branding, and products anytime after opening
          your store.
        </p>

        <span className="inline-flex rounded-full bg-black px-4 py-1.5 text-xs font-semibold text-white">
          Trusted Seller Platform
        </span>
      </div>

    </section>
  );
}

export default TrustBuildingSection;
