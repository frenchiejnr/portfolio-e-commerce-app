export const CartItem = ({ item }) => {
  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
      <div className="items-center md:flex">
        <div className="md:shrink-0">
          <img
            src={item.image_url}
            className="h48 aspect-square w-full object-cover md:h-full md:w-48"
          />
        </div>
        <div className="p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
            {item.name}
          </p>
          <p className="mt-1 block text-lg font-medium leading-tight text-black">
            £{item.price}
          </p>
          <div className="mt-2 flex items-center">
            <p className="mr-1 text-sm font-normal text-black">Quantity</p>
            <p class="inline-flex select-none items-center rounded-xl border-b border-t border-gray-100 bg-gray-100 px-4 py-1 text-black hover:bg-gray-100">
              {item.quantity}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
