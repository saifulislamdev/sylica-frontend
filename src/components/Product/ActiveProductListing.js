import React, { useRef, useState } from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Heading,
    HStack,
    Text,
    Divider,
    Button,
    Image,
    VStack,
} from '@chakra-ui/react';
import { colors } from '../../util/constants';
import { useHistory } from 'react-router';

export default function ActiveProductListing({
    id,
    imageSrc,
    title,
    description,
    price,
    maxQuantity,
}) {
    // if proper number not passed in for maxQuantity or it is actually out of stock
    const isOutOfStock =
        isNaN(parseInt(maxQuantity)) || parseInt(maxQuantity) === 0;
    const [isOpen, setIsOpen] = useState(false);
    const cancelRef = useRef();
    const onClose = () => setIsOpen(false);
    const history = useHistory();

    return (
        <VStack
            width='full'
            borderWidth='1px'
            borderRadius={8}
            alignItems='flex-start'
            p={4}
            mt={4}
        >
            <HStack width='full' justifyContent='space-between'>
                <HStack spacing={6}>
                    <VStack alignItems='flex-start' spacing={0}>
                        <Text color={colors.neutralGray} fontSize='sm'>
                            Price
                        </Text>
                        <Text fontSize='lg' data-testid='price'>
                            {price}
                        </Text>
                    </VStack>
                    <VStack alignItems='flex-start' spacing={0}>
                        <Text color={colors.neutralGray} fontSize='sm'>
                            Quantity
                        </Text>
                        <Text fontSize='lg' data-testid='quantity'>
                            {maxQuantity}
                        </Text>
                    </VStack>
                </HStack>
                <Heading float='right' size='lg' data-testid='status'>
                    {isOutOfStock ? 'Sold Out' : 'Active'}
                </Heading>
            </HStack>
            <Divider />
            <HStack alignItems='flex-start' spacing={6}>
                <Image
                    src={imageSrc}
                    alt='img'
                    borderRadius='16px'
                    boxSize='150px'
                    objectFit='contain'
                    data-testid='image'
                />

                <VStack alignItems='flex-start'>
                    <Heading size='md' data-testid='title'>
                        {title}
                    </Heading>
                    <Text noOfLines='3' w='80%' data-testid='description'>
                        {description}
                    </Text>
                    <Button
                        colorScheme={colors.colorScheme}
                        size='xs'
                        variant='outline'
                        onClick={() => history.push(`/products/${id}`)}
                    >
                        View Item
                    </Button>
                </VStack>
                <Button
                    colorScheme={colors.colorScheme}
                    size='sm'
                    w='300px'
                    onClick={() => {
                        setIsOpen(true);
                    }}
                >
                    Remove Listing
                </Button>
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                Delete Product Listing
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                Are you sure? You can't undo this action
                                afterwards.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    colorScheme='red'
                                    onClick={onClose}
                                    ml={3}
                                >
                                    Delete
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </HStack>
        </VStack>
    );
}
