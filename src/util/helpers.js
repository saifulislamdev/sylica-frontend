/* If the item does not already exist in cart, create new cart item. If the item already exists in cart, simply increment the quantity of the cart item */
export const addToCartOrIncrementQuantity = (
	handleAddQuantity,
	cart,
	handleAddToCart,
	id,
	imageSrc,
	description,
	title,
	unitPrice
) => {
	let indexInCart = 0;
	const isInCart = cart.some((product, i) => {
		indexInCart = i;
		return product.id === id;
	});
	if (!isInCart) {
		handleAddToCart(id, 1, unitPrice, imageSrc, title, description);
	} else handleAddQuantity(id, cart[indexInCart].quantity + 1);
};
