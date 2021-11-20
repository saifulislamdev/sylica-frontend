import React, { useEffect, useState } from 'react';
import { Box, Flex, Input, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import ProductListing from '../components/Product/ProductListing';
import ProductPagination from '../components/Product/ProductPagination';
import { axiosInstance } from '../util/config';

export default function Products() {
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState('');
	const [isLoaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	/* Configuring products on different pages of the products page */
	const [currPage, setCurrPage] = useState(0);
	const [productsPerPage, setProductsPerPage] = useState(16);
	const [pageFirstProductIndex, setPageFirstProductIndex] = useState();
	const [pageLastProductIndex, setPageLastProductIndex] = useState();
	const productsPerPageOptions = [0, 4, 8, 16, 24];

	const handleSearchChange = (e) => {
		setSearch(e.target.value);
		setProductsPerPage(productsPerPageOptions.at(-1));
		setCurrPage(0);
	};

	useEffect(() => {
		axiosInstance
			.get('/products/getProducts')
			.then((res) => {
				setProducts(
					res.data.products.map((product) => {
						// store only what's necessary
						return {
							description: product.description,
							id: product._id,
							images: product.images,
							price: product.price,
							quantity: product.quantity,
							title: product.title,
						};
					})
				);
				setLoaded(true);
			})
			.catch((err) => {
				setErrorMessage(err.response.data.msg); // msg is the field for error message from backend
				setError(true);
			});
	}, []);

	return !error ? (
		isLoaded ? (
			<>
				<Box p='16px'>
					<Input
						onChange={handleSearchChange}
						value={search}
						placeholder='Search Products...'
						borderRadius='6px'
						isFullWidth='true'
						isDisabled={!products}
						size='md'
						variant='outline'
					></Input>
				</Box>
				<Flex
					align='center'
					justify={['center', 'center', 'center', 'center', 'flex-start']}
					wrap='wrap'
				>
					{products
						.filter((product, index) => {
							return (
								pageFirstProductIndex <= index && index <= pageLastProductIndex
							);
						})
						.map((product) => {
							if (product.title.toLowerCase().includes(search.toLowerCase()))
								return (
									<ProductListing
										description={product.description}
										id={product.id}
										imageSrc={product.images[0].src}
										price={product.price}
										quantity={product.quantity}
										title={product.title}
									/>
								);
						})}
				</Flex>
				<ProductPagination
					currPage={currPage}
					pageFirstProductIndex={pageFirstProductIndex}
					pageLastProductIndex={pageLastProductIndex}
					productsPerPage={productsPerPage}
					productsPerPageOptions={productsPerPageOptions}
					setCurrPage={setCurrPage}
					setPageFirstProductIndex={setPageFirstProductIndex}
					setPageLastProductIndex={setPageLastProductIndex}
					setProductsPerPage={setProductsPerPage}
					totalProducts={products.length}
				/>
			</>
		) : (
			<SimpleGrid columns={4} gap={6}>
				{Array(8)
					.fill(4)
					.map((x) => (
						<Skeleton h='420px' w='full' borderRadius={6} />
					))}
			</SimpleGrid>
		)
	) : (
		<Text color='red' pl='16px'>
			{errorMessage}
		</Text>
	);
}
