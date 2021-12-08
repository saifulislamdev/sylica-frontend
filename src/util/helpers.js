import { createStandaloneToast } from '@chakra-ui/react';

/* If the item does not already exist in cart, create new cart item. If the item already exists in cart, simply increment the quantity of the cart item */
export const addToCartOrIncrementQuantity = (
    handleAddQuantity,
    cart,
    handleAddToCart,
    id,
    imageURL,
    description,
    quantity,
    title,
    unitPrice
) => {
    let indexInCart = 0;
    const isInCart = cart.some((product, i) => {
        indexInCart = i;
        return product.id === id;
    });
    if (!isInCart) {
        handleAddToCart({
            id,
            quantity,
            unitPrice,
            imageURL,
            title,
            description,
        });
    } else handleAddQuantity(id, cart[indexInCart].quantity + quantity);
};

export const addToCartToast = () => {
    const toast = createStandaloneToast();

    return toast({
        title: 'Added to cart!',
        description: `We've added the product to cart`,
        position: 'bottom-right',
        status: 'success',
        isClosable: true,
    });
};
