
import React, { useState } from 'react';
import Calendar from '../components/Calendar';

const BookingPage: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    
    return (
        <div className="flex justify-center py-5">
            <div className="layout-content-container flex flex-col items-center max-w-[960px] flex-1 px-4">
                <h2 className="text-[#0d1b12] tracking-light text-[28px] font-bold leading-tight text-center pb-3 pt-5">
                    Book an Appointment
                </h2>

                <div className="w-full max-w-md space-y-4 py-3">
                    <div className="relative">
                        <select
                            className="appearance-none w-full cursor-pointer rounded-xl text-[#0d1b12] focus:outline-0 focus:ring-2 focus:ring-[#13ec5b] border border-[#cfe7d7] bg-[#f8fcf9] h-14 p-4 pr-10 text-base"
                            defaultValue=""
                        >
                            <option value="" disabled>Select a Service</option>
                            <option value="grooming">Full Grooming</option>
                            <option value="bath">Bath & Brush</option>
                            <option value="nails">Nail Trim</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#4c9a66]">
                            <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                    <div className="relative">
                        <select
                            className="appearance-none w-full cursor-pointer rounded-xl text-[#0d1b12] focus:outline-0 focus:ring-2 focus:ring-[#13ec5b] border border-[#cfe7d7] bg-[#f8fcf9] h-14 p-4 pr-10 text-base"
                             defaultValue=""
                        >
                            <option value="" disabled>Select a Groomer</option>
                            <option value="any">Any Available</option>
                            <option value="jessica">Jessica</option>
                            <option value="mike">Mike</option>
                            <option value="sandra">Sandra</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#4c9a66]">
                            <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>

                <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />

                <div className="w-full max-w-md py-3">
                    <textarea
                        placeholder="Special instructions"
                        className="form-input flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-xl text-[#0d1b12] focus:outline-0 focus:ring-2 focus:ring-[#13ec5b] border border-[#cfe7d7] bg-[#f8fcf9] min-h-36 placeholder:text-[#4c9a66] p-4 text-base font-normal leading-normal"
                    ></textarea>
                </div>

                <div className="py-3">
                    <button
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-8 bg-[#13ec5b] text-[#0d1b12] text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity"
                    >
                        <span className="truncate">Book Now</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
