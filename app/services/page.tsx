"use client";

import React, { useState, useEffect } from "react";
import Dropdown from "../../components/Dropdown";
import Calendar from "../../components/Calendar";
import RegisterPetModal from "../../components/RegisterPetModal";
import { useAuth } from "@/hooks/useAuth";

// Define service and groomer options
// Default service and groomer options - these will be dynamically updated when new values are added
const DEFAULT_SERVICE_OPTIONS = [
  { value: "", label: "Select a Service" },
  { value: "grooming", label: "Full Grooming" },
  { value: "bath", label: "Bath & Brush" },
  { value: "nails", label: "Nail Trim" },
  { value: "teeth", label: "Teeth Cleaning" },
  { value: "massage", label: "Pet Massage" },
];

const DEFAULT_GROOMER_OPTIONS = [
  { value: "", label: "Select a Groomer" },
  { value: "any", label: "Any Available" },
  { value: "jessica", label: "Jessica" },
  { value: "mike", label: "Mike" },
  { value: "sandra", label: "Sandra" },
  { value: "alex", label: "Alex" },
  { value: "taylor", label: "Taylor" },
];

const ServicesPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState("");
  const [selectedGroomer, setSelectedGroomer] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [petId, setPetId] = useState<string>("");
  const [pets, setPets] = useState<any[]>([]);
  const [isRegisterPetModalOpen, setIsRegisterPetModalOpen] = useState(false);
  const [serviceOptions, setServiceOptions] = useState(DEFAULT_SERVICE_OPTIONS);
  const [groomerOptions, setGroomerOptions] = useState(DEFAULT_GROOMER_OPTIONS);
  const { user } = useAuth();

  // Fetch user's pets when user is authenticated
  useEffect(() => {
    const fetchPets = async () => {
      if (user) {
        try {
          const response = await fetch("/api/pets");
          if (response.ok) {
            const petsData = await response.json();
            setPets(petsData);
          }
        } catch (error) {
          console.error("Error fetching pets:", error);
        }
      } else {
        setPets([]);
        setPetId("");
      }
    };

    fetchPets();
  }, [user]);

  // Function to add new service option dynamically
  const addNewServiceOption = (value: string, label: string) => {
    const newOption = { value, label };
    setServiceOptions((prev) => {
      // Check if option already exists to avoid duplicates
      const exists = prev.some((option) => option.value === value);
      if (!exists) {
        return [...prev, newOption];
      }
      return prev;
    });
  };

  // Function to add new groomer option dynamically
  const addNewGroomerOption = (value: string, label: string) => {
    const newOption = { value, label };
    setGroomerOptions((prev) => {
      // Check if option already exists to avoid duplicates
      const exists = prev.some((option) => option.value === value);
      if (!exists) {
        return [...prev, newOption];
      }
      return prev;
    });
  };

  const handleBookingRedirect = () => {
    if (!selectedService || !selectedGroomer) {
      alert("Please select both a service and a groomer.");
      return;
    }

    // Redirect to booking page with selected options as query parameters
    const params = new URLSearchParams({
      service: selectedService,
      groomer: selectedGroomer,
      date: selectedDate.toISOString(),
      petId: petId || "",
    }).toString();

    if (user) {
      // If user is logged in, go directly to booking
      window.location.href = `/booking?${params}`;
    } else {
      // If user is not logged in, redirect to login but save the service/groomer selection
      window.location.href = `/login`;
    }
  };

  return (
    <div className="flex justify-center py-5">
      <div className="layout-content-container flex flex-col items-center max-w-[960px] flex-1 px-4">
        <h2 className="text-[#0d1b12] tracking-light text-[28px] font-bold leading-tight text-center pb-3 pt-5">
          Our Services
        </h2>

        <div className="w-full max-w-md space-y-6 py-8">
          {user && (
            <div className="py-3 flex justify-center">
              <button
                onClick={() => setIsRegisterPetModalOpen(true)}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-8 bg-[#13ec5b] text-[#0d1b12] text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity"
              >
                Register Pet
              </button>
            </div>
          )}

          {/* Pet Selection */}
          {user && (
            <div>
              <h3 className="text-[#0d1b12] text-lg font-semibold mb-3">
                Select a Pet
              </h3>
              <Dropdown
                options={[
                  {
                    value: "",
                    label:
                      pets.length > 0 ? "Select a Pet" : "No pets registered",
                  },
                  ...pets.map((pet) => ({
                    value: pet.id,
                    label: `${pet.name} (${pet.species || "Pet"})`,
                  })),
                ]}
                selectedValue={petId}
                onChange={setPetId}
                placeholder={
                  pets.length > 0 ? "Select a Pet" : "No pets registered"
                }
                className="w-full"
              />
            </div>
          )}

          <div>
            <h3 className="text-[#0d1b12] text-lg font-semibold mb-3">
              Pet Services
            </h3>
            <Dropdown
              options={serviceOptions}
              selectedValue={selectedService}
              onChange={setSelectedService}
              placeholder="Select a Service"
              className="w-full"
            />
          </div>

          <div>
            <h3 className="text-[#0d1b12] text-lg font-semibold mb-3">
              Groomer Selection
            </h3>
            <Dropdown
              options={groomerOptions}
              selectedValue={selectedGroomer}
              onChange={setSelectedGroomer}
              placeholder="Select a Groomer"
              className="w-full"
            />
          </div>
        </div>

        <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />

        <div className="py-3">
          <button
            onClick={handleBookingRedirect}
            className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-8 bg-[#13ec5b] text-[#0d1b12] text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity"
          >
            <span className="truncate">Book Appointment</span>
          </button>
        </div>

        <div className="mt-8 text-center text-[#4c9a66]">
          <p className="text-base font-medium">
            Our professional groomers provide top-quality care for your pets
          </p>
          <p className="text-sm mt-2">
            All services include a complimentary consultation
          </p>
        </div>
      </div>

      {isRegisterPetModalOpen && (
        <RegisterPetModal
          isOpen={isRegisterPetModalOpen}
          onClose={() => setIsRegisterPetModalOpen(false)}
          onPetRegistered={async () => {
            // Refresh pets after registration
            if (user) {
              try {
                const response = await fetch("/api/pets");
                if (response.ok) {
                  const petsData = await response.json();
                  setPets(petsData);
                }
              } catch (error) {
                console.error("Error refreshing pets:", error);
              }
            }
            setIsRegisterPetModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ServicesPage;
