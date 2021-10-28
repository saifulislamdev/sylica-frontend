import React, { useEffect, useState } from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';

export default function PaymentForm() {
	return <PaymentElement id='payment-element' />;
}
