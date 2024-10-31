
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const AdvancedData = () => {
    const [tab, setTab] = useState('details');

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold mb-4">Advanced Data (Authorised Access)</h1>

            <div className="flex space-x-4 mb-6">
                <button onClick={() => setTab('details')} className={`py-2 px-4 ${tab === 'details' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                    Product Details
                </button>
                <button onClick={() => setTab('history')} className={`py-2 px-4 ${tab === 'history' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                    Lifecycle History
                </button>
                <button onClick={() => setTab('insights')} className={`py-2 px-4 ${tab === 'insights' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                    Insights
                </button>
            </div>

            {tab === 'details' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Detailed Product Specifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Comprehensive specifications of the product.</p>
                    </CardContent>
                </Card>
            )}

            {tab === 'history' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Product Lifecycle History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>In-depth records and updates on product lifecycle.</p>
                    </CardContent>
                </Card>
            )}

            {tab === 'insights' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Advanced Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Specialised data insights for authorised users.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default AdvancedData;
