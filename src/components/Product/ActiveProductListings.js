import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../util/config';
import ActiveProductListing from './ActiveProductListing';

function ActiveProductListings() {
    const [activeListings, setActiveListings] = useState([]);
    const userId = '61684686e96b9d376bf9985f'; // TODO: get actual user.id from local storage

    useEffect(() => {
        axiosInstance
            .get(`/products/active-listings/${userId}`)
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
                console.log(err.response.data.msg);
            });
    });
    return (
        <>
            {activeListings.map((listing) => (
                <ActiveProductListing
                    description={listing.description}
                    imageSrc={listing.images[0].src}
                    price={listing.price}
                    maxQuantity={listing.quantity}
                    title={listing.title}
                />
            ))}
        </>
    );
}

export default ActiveProductListings;
