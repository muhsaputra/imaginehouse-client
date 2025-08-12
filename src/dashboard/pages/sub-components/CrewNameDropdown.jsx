import { Listbox } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

export default function CrewNameDropdown({ selectedId, crews, onChange }) {
  const selectedCrew = crews.find((c) => c._id === selectedId);

  return (
    <div className="w-full">
      <Listbox value={selectedId} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-xl bg-white py-2 pl-4 pr-10 text-left shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition">
            <span className="block truncate">
              {selectedCrew?.name || "Pilih Crew"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {crews.map((crew) => (
              <Listbox.Option
                key={crew._id}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-primary/10 text-primary" : "text-gray-900"
                  }`
                }
                value={crew._id}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {crew.name}
                    </span>
                    {selected ? (
                      <span className="absolute left-3 inset-y-0 flex items-center text-primary">
                        <Check className="h-4 w-4" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
