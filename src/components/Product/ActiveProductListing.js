import React from 'react';
import {
	Heading,
	HStack,
	Text,
	Divider,
	Button,
	Image,
	VStack,
} from '@chakra-ui/react';
import { colors } from '../../util/constants';

export default function ActiveProductListing() {
	return (
		<VStack
			width='full'
			borderWidth='1px'
			borderRadius={6}
			alignItems='flex-start'
			p={6}
		>
			<HStack width='full' justifyContent='space-between'>
				<HStack spacing={6}>
					<VStack alignItems='flex-start' spacing={0}>
						<Text color={colors.neutralGray} fontSize='sm'>
							Price
						</Text>
						<Text fontSize='lg'>999.99</Text>
					</VStack>
					<VStack alignItems='flex-start' spacing={0}>
						<Text color={colors.neutralGray} fontSize='sm'>
							Quantity
						</Text>
						<Text fontSize='lg'>100</Text>
					</VStack>
				</HStack>
				<Heading float='right' size='lg'>
					Active
				</Heading>
			</HStack>
			<Divider />
			<HStack alignItems='flex-start' spacing={6}>
				<Image
					src='https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6476/6476246cv21d.jpg;maxHeight=640;maxWidth=550'
					alt='img'
					borderRadius='16px'
					boxSize='150px'
					objectFit='contain'
				/>

				<VStack alignItems='flex-start'>
					<Heading size='md'>Samsung TV</Heading>
					<Text noOfLines='3' w='80%'>
						Get enhanced smart capabilities with the TU6985. Crystal Processor
						4K automatically upscales your favorite movies, TV shows and sports
						events to 4K. Smart TV powered by Tizen lets you find content and
						navigate streaming services easily. PurColor fine tunes colors while
						HDR steps up to millions of shades of color that go beyond what HDTV
						can offer.
					</Text>
					<Button colorScheme={colors.colorScheme} size='xs' variant='outline'>
						View Item
					</Button>
				</VStack>
				<Button colorScheme={colors.colorScheme} size='sm' w='300px'>
					Remove Listing
				</Button>
			</HStack>
		</VStack>
	);
}
