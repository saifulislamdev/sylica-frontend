import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { SimpleGrid, Text } from '@chakra-ui/react';

import ProductDetail from '../components/Product/ProductDetail';
import ProductDetailImages from '../components/Product/ProductDetailImages';
import Specifications from '../components/Product/Specifications';

import { API_BASE_URL, axiosInstance } from '../util/config';

export default function Products() {
    const [productInfo, setProductInfo] = useState();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { id } = useParams();

    useEffect(() => {
        axiosInstance
            .get(`/products/${id}`)
            .then((res) => {
                const product = res.data.product;
                setProductInfo({
                    description: product.description,
                    images: product.images,
                    price: product.price,
                    quantity: product.quantity,
                    specifications: product.specifications,
                    title: product.title,
                });
            })
            .catch((err) => {
                setErrorMessage(err.response.data.msg); // msg is the field for error message from backend
                setError(true);
            });
    }, [id]);

    return !error && productInfo ? (
        <SimpleGrid spacingY='32px'>
            <SimpleGrid row columns={2} minChildWidth='320px' spacingY='32px'>
                <SimpleGrid column>
                    {productInfo.images && productInfo.quantity && (
                        <ProductDetailImages
                            images={productInfo.images}
                            maxQuantity={productInfo.quantity}
                        ></ProductDetailImages>
                    )}
                </SimpleGrid>
                <SimpleGrid column>
                    {productInfo.title &&
                        productInfo.description &&
                        productInfo.price &&
                        productInfo.quantity && (
                            <ProductDetail
                                id={id}
                                imageSrc={`${API_BASE_URL}${productInfo.images[0].src}`}
                                title={productInfo.title}
                                description={productInfo.description}
                                price={productInfo.price}
                                maxQuantity={productInfo.quantity}
                            />
                        )}
                </SimpleGrid>
            </SimpleGrid>
            {productInfo.specifications && (
                <Specifications specifications={productInfo.specifications} />
            )}
        </SimpleGrid>
    ) : (
        <Text color='red' pl='16px'>
            {errorMessage}
        </Text>
    );
}
