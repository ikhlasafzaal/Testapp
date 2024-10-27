import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import SecondaryButton from '@/Components/SecondaryButton';

const Index = ({ auth, events }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        type: '',
        start_date: '',
        end_date: '',
        location: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('dashboard.events.store'), {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };
    
    const [open, setOpen] = useState(false);

    return (
        <Authenticated user={auth.user}>
            <>
                <Head title="Events" />

                <div className='max-w-7xl mx-auto bg-white my-5 rounded-lg shadow p-4'>
                    <header className="bg-white shadow-md rounded-lg p-4 mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Step 2: Select Invitees</h2>
                    </header>

                    <div className="flex justify-between mb-4 p-3">
                        <button
                            className="bg-purple-500 text-white px-4 py-2 rounded"
                            onClick={() => setOpen(true)}
                        >
                            Create
                        </button>

                        <input
                            type="text"
                            className="border rounded px-4 py-2 w-1/2"
                            placeholder="Search & Filter"
                        />

                        <button className="bg-purple-500 text-white px-4 py-2 rounded">Advance Search</button>
                    </div>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        <input type="checkbox" />
                                    </th>
                                    <th scope="col" className="px-6 py-3">Full Name</th>
                                    <th scope="col" className="px-6 py-3">Description</th>
                                    <th scope="col" className="px-6 py-3">Event Type</th>
                                    <th scope="col" className="px-6 py-3">Start Date</th>
                                    <th scope="col" className="px-6 py-3">End Date</th>
                                    <th scope="col" className="px-6 py-3">Location</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {events.map((event) => (
                                    <tr key={event.id} className="border-b hover:bg-gray-100 transition duration-200 bg-gray-50">
                                        <td className="px-6 py-4">
                                            <input type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {event.name}
                                        </td>
                                        <td className="px-6 py-4">{event.description}</td>
                                        <td className="px-6 py-4">{event.type}</td>
                                        <td className="px-6 py-4">{event.start_date}</td>
                                        <td className="px-6 py-4">{event.end_date}</td>
                                        <td className="px-6 py-4">{event.location}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="flex justify-between items-center mt-4 p-3">
                            <SecondaryButton className="px-4 py-2 rounded">Exit</SecondaryButton>
                            <div className="flex space-x-4">
                                <SecondaryButton className="px-4 py-2 rounded">Back</SecondaryButton>
                                <button className="bg-purple-500 text-white px-4 py-2 rounded">Save</button>
                                <button className="bg-purple-500 text-white px-4 py-2 rounded">Next</button>
                            </div>
                        </div>
                    </div>
                </div>

                <BottomSheet open={open} onDismiss={() => setOpen(false)}>
                    <div className="p-6">
                        <h2 className="text-lg font-bold mb-4">Step 1: Create Event</h2>

                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Event Name</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    placeholder="Enter event name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <div className="text-red-600">{errors.name}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Event Description</label>
                                <textarea
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    rows="4"
                                    placeholder="Enter event description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                ></textarea>
                                {errors.description && <div className="text-red-600">{errors.description}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Event Type</label>
                                <select
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                >
                                    <option disabled>Select event type</option>
                                    <option value="conference">Conference</option>
                                    <option value="workshop">Workshop</option>
                                    <option value="meetup">Meetup</option>
                                </select>
                                {errors.type && <div className="text-red-600">{errors.type}</div>}
                            </div>

                            <div className="mb-4 grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Event Start Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                    />
                                    {errors.start_date && <div className="text-red-600">{errors.start_date}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Event End Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={data.end_date}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                    />
                                    {errors.end_date && <div className="text-red-600">{errors.end_date}</div>}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Location</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    placeholder="Enter location"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                />
                                {errors.location && <div className="text-red-600">{errors.location}</div>}
                            </div>

                            <div className="flex justify-between">
                                <SecondaryButton
                                    className="px-4 py-2 rounded"
                                    onClick={() => setOpen(false)}
                                >
                                    Exit
                                </SecondaryButton>

                                <div className="space-x-2">
                                    <button
                                        type="submit"
                                        className="bg-purple-500 text-white px-4 py-2 rounded"
                                        disabled={processing}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </BottomSheet>
            </>
        </Authenticated>
    );
};

export default Index;
