import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../util/config';
import ActiveProductListing from './ActiveProductListing';
import { Text } from '@chakra-ui/react';

function ActiveProductListings() {
    const [activeListings, setActiveListings] = useState([]);
    const [error, setError] = useState(undefined);
    const user = JSON.parse(window.localStorage.getItem('user'));

    useEffect(() => {
        axiosInstance
            .get(`/products/active-listings/${user._id}`)
            .then((res) => {
                setActiveListings(
                    res.data.products.map((product) => ({
                        description: product.description,
                        id: product._id,
                        images: product.images,
                        price: product.price,
                        quantity: product.quantity,
                        title: product.title,
                    }))
                );
            })
            .catch((err) => {
                setError(err.response?.data?.msg);
                console.log(error);
            });
    }, [activeListings]);
    return (
        <>
            {error ? (
                <Text textAlign='center' color='red'>
                    {error}
                </Text>
            ) : (
                activeListings.map((listing) => (
                    <ActiveProductListing
                        description={listing.description}
                        imageSrc={listing.images[0].src}
                        price={listing.price}
                        maxQuantity={listing.quantity}
                        title={listing.title}
                        id={listing.id}
                    />
                ))
            )}
        </>
    );
}

export default ActiveProductListings;
