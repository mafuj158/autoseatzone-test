import { cn } from '@/lib/utils';
import React from 'react';

const CommonSectionTitle = ({ className, text = "" }) => {
    return (
        <h3 className={cn("text-2xl xl:text-5xl font-bold text-textBlack", className)}>
            {text}
        </h3>
    );
};

export default CommonSectionTitle;