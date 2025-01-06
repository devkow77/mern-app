import React from "react";

const Perks = ({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (selected: string[]) => void;
}) => {
  const handleCbClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((item) => item !== name)]);
    }
  };

  <input
    type="checkbox"
    checked={selected.includes("wifi")}
    name="wifi"
    onChange={handleCbClick}
  />;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      <label className="flex cursor-pointer items-center gap-2 rounded-2xl border p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
          />
        </svg>
        <input
          type="checkbox"
          checked={selected.includes("parking")}
          name="parking"
          onChange={handleCbClick}
        />
        <span>Wifi</span>
      </label>
      <label className="flex cursor-pointer items-center gap-2 rounded-2xl border p-4">
        <input
          type="checkbox"
          checked={selected.includes("tv")}
          name="tv"
          onChange={handleCbClick}
        />
        <span>Free parking spot</span>
      </label>
      <label className="flex cursor-pointer items-center gap-2 rounded-2xl border p-4">
        <input
          type="checkbox"
          checked={selected.includes("pets")}
          name="pets"
          onChange={handleCbClick}
        />
        <span>TV</span>
      </label>
      <label className="flex cursor-pointer items-center gap-2 rounded-2xl border p-4">
        <input
          type="checkbox"
          checked={selected.includes("entrance")}
          name="entrance"
          onChange={handleCbClick}
        />
        <span>Pets</span>
      </label>
      <label className="flex cursor-pointer items-center gap-2 rounded-2xl border p-4">
        <span>Private Entrace</span>
      </label>
    </div>
  );
};

export default Perks;
