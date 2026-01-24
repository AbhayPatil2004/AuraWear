"use client"

import React from 'react'
import Link from 'next/link'
import Image from "next/image";
import HeroSection from './component/HeroSection.jsx'
import FeatureSection from './component/FeatureSection.jsx'
import HowItWorks from './component/HowItWorks.jsx'
import TestimonialSection from './component/TestimonialSection.jsx'
import CTASection from './component/CTASection.jsx'

function Welcome() {
    return (
        <div>
            {/* // { Hero Section} */}
            <HeroSection></HeroSection>
            <FeatureSection></FeatureSection>
            <HowItWorks></HowItWorks>
            <TestimonialSection></TestimonialSection>
            <CTASection></CTASection>
        </div>
    )
}

export default Welcome