"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { PageTransition } from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Listbox } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

// Components

import CrewNameDropdown from "@/pages/sub-components/CrewNameDropdown";

const RevenueSharing = () => {
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [crews, setCrews] = useState([]);
  const [crewOptions, setCrewOptions] = useState([]);
  const [crewAssignments, setCrewAssignments] = useState([
    { crewId: "", role: "", share: "" },
  ]);

  useEffect(() => {
    const fetchCrews = async () => {
      try {
        const res = await axios.get("api/v1/crew"); // Ganti endpoint sesuai backend kamu
        setCrews(res.data);
      } catch (err) {
        console.error("Failed to fetch crews:", err);
      }
    };

    fetchCrews();
  }, []);

  const handleAddCrew = () => {
    setCrewAssignments([
      ...crewAssignments,
      { crewId: "", role: "", share: "" },
    ]);
  };

  useEffect(() => {
    axios
      .get("api/v1/crew") // Sesuaikan endpoint backend kamu
      .then((res) => {
        setCrewOptions(res.data); // Pastikan res.data adalah array nama crew
      });
  }, []);

  const confirmDeleteProject = (projectId) => {
    setProjectToDelete(projectId);
    setShowDeleteModal(true);
  };

  const formatRupiahInput = (value) => {
    const angka = value.replace(/[^,\d]/g, "");
    const split = angka.split(",");
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      const separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return rupiah ? "Rp" + rupiah : "";
  };

  const formatRupiah = (angka) => {
    let numberString = angka.toString().replace(/[^,\d]/g, "");
    const split = numberString.split(",");
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      const separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return "Rp" + rupiah;
  };

  const handleCrewChange = (index, name, value) => {
    const newCrews = [...form.crews];

    if (name === "crewId") {
      const matchedCrew = crews.find((c) => c._id === value);
      newCrews[index].crewId = value;
      newCrews[index].crewName = matchedCrew?.name || "";
      newCrews[index].crewRole = matchedCrew?.default_role || "";
      newCrews[index].crewPercentage = matchedCrew?.default_share_percent || 0;

      const total_income = parseInt(form.total_income) || 0;
      const crew_share = total_income * 0.4;
      const calculatedShare = Math.floor(
        (crew_share * newCrews[index].crewPercentage) / 100
      );

      newCrews[index].crewShare = calculatedShare;
      newCrews[
        index
      ].formattedCrewPercentage = `${newCrews[index].crewPercentage}%`;
      newCrews[index].formattedCrewShare = formatRupiahInput(
        calculatedShare.toString()
      );
    } else if (name === "crewPercentage") {
      let numericValue = parseFloat(String(value).replace(/[^0-9]/g, "")) || 0;
      if (numericValue > 100) numericValue = 100;

      const total_income = parseInt(form.total_income) || 0;
      const crew_share = total_income * 0.4;
      const calculatedShare = Math.floor((crew_share * numericValue) / 100);

      newCrews[index].crewPercentage = numericValue;
      newCrews[index].formattedCrewPercentage = `${numericValue}%`;
      newCrews[index].crewShare = calculatedShare;
      newCrews[index].formattedCrewShare = formatRupiahInput(
        calculatedShare.toString()
      );
    } else if (name === "crewShare") {
      const numericShare = parseInt(String(value).replace(/[^0-9]/g, "")) || 0;
      newCrews[index].crewShare = numericShare;
      newCrews[index].formattedCrewShare = formatRupiahInput(
        numericShare.toString()
      );
    } else {
      // Misalnya crewRole atau field lain
      newCrews[index][name] = value;
    }

    setForm({ ...form, crews: newCrews });
  };

  const parseRupiahToNumber = (value) => Number(value.replace(/[^0-9]/g, ""));

  const handleDeleteProject = async () => {
    try {
      await axios.delete(
        `http://localhost:4000/api/v1/revenue/projects/${projectToDelete}`
      );
      fetchProjects(); // refresh data
      setShowDeleteModal(false);
      toast.success("Transaksi dihapus.");
      setProjectToDelete(null);
    } catch (err) {
      console.error("Gagal menghapus project:", err);
    }
  };
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    client_name: "",
    date: "",
    total_income: "",
    crews: [{ crewName: "", crewRole: "", crewPercentage: "", crewShare: "" }],
  });
  const [selectedCrewList, setSelectedCrewList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addCrewField = () => {
    const total_income = Number(form.total_income);
    const crew_share = Math.round(total_income * 0.4);
    const crewCount = form.crews.length + 1;
    const equalPercentage = 100 / crewCount;
    const equalShare = Math.floor(crew_share / crewCount);

    const updatedCrews = form.crews.map((c) => ({
      ...c,
      crewPercentage: equalPercentage,
      crewShare: Math.floor((crew_share * equalPercentage) / 100),
    }));

    updatedCrews.push({
      crewName: "",
      crewRole: "",
      crewPercentage: equalPercentage,
      crewShare: equalShare,
    });

    setForm({ ...form, crews: updatedCrews });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/revenue/projects"
      );
      setProjects(res.data);
    } catch (err) {
      console.error("Gagal mengambil data projects:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "total_income") {
      const cleanValue = parseRupiahToNumber(value);
      setForm({
        ...form,
        [name]: cleanValue,
        formatted_total_income: formatRupiahInput(value),
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const removeCrewField = (index) => {
    const newCrews = [...form.crews];
    newCrews.splice(index, 1);
    setForm({ ...form, crews: newCrews });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedForm = {
        ...form,
        total_income: parseInt(form.total_income),
        crews: form.crews.map((c) => ({
          ...c,
          crewShare: parseInt(c.crewShare),
          crewPercentage: parseFloat(c.crewPercentage),
        })),
      };

      // 1. Simpan ke Revenue Projects
      await axios.post(
        "http://localhost:4000/api/v1/revenue/projects",
        formattedForm
      );

      // 2. Tambahkan ke Finance Tracker (hanya Imagine House)
      const imagineAmount = Math.floor(formattedForm.total_income * 0.6);
      const financeEntry = {
        title: form.client_name || "Untitled Project", // ganti dari project_name
        amount: Number(imagineAmount), // pastikan number
        type: "income",
        category: "Imagine House Share", // wajib karena required
        description: `Auto from project: ${form.client_name} Revenue Sharing`, // opsional
        date: new Date(form.date).toISOString(),
      };

      await axios.post("http://localhost:4000/api/v1/finance", financeEntry);

      // 3. Reset form dan refresh project list
      fetchProjects();
      toast.success("Transaksi berhasil disimpan!");
      setForm({
        client_name: "",
        date: "",
        total_income: "",
        crews: [
          { crewName: "", crewRole: "", crewPercentage: "", crewShare: "" },
        ],
      });
    } catch (err) {
      console.error("Gagal menambahkan project:", err);
    }
  };

  const totalIncomeAll = projects.reduce(
    (acc, cur) => acc + cur.total_income,
    0
  );
  const totalCrewShareAll = projects.reduce(
    (acc, cur) => acc + cur.crew_share,
    0
  );
  const totalImagineShareAll = projects.reduce(
    (acc, cur) => acc + cur.imagine_share,
    0
  );

  const handleShowCrewDetail = (crews) => {
    setSelectedCrewList(crews);
    setShowModal(true);
  };

  return (
    <PageTransition>
      <div className="flex flex-col gap-6 p-6 w-full">
        <h1 className="text-4xl font-bold text-[#841618]">
          Revenue Sharing 💸
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SummaryCard title="Total Income" amount={totalIncomeAll} />
          <SummaryCard
            title="Imagine House Share (60%)"
            amount={totalImagineShareAll}
          />
          <SummaryCard title="Crew Share (40%)" amount={totalCrewShareAll} />
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-neutral-800 p-4 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-sm flex flex-col gap-4"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Add New Project
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              name="client_name"
              value={form.client_name}
              onChange={handleChange}
              placeholder="Client Name"
              className="input"
              required
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="input"
              required
            />
            <input
              type="text"
              name="total_income"
              value={form.formatted_total_income || ""}
              onChange={handleChange}
              placeholder="Total Income"
              className="input"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Crew Members
            </p>
            {form.crews.map((crew, index) => (
              <div
                key={index}
                className="grid md:grid-cols-5 gap-2 items-center relative"
              >
                {/* Crew Name Dropdown */}
                <Listbox
                  value={crew.crewId ?? ""}
                  onChange={(val) => handleCrewChange(index, "crewId", val)}
                >
                  <div className="relative">
                    {/* Button */}
                    <Listbox.Button className="relative w-full cursor-pointer rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30">
                      <div className="flex items-center gap-3">
                        {crew.crewId ? (
                          <img
                            src={
                              crews.find((c) => c._id === crew.crewId)?.photo ||
                              "/default-avatar.png"
                            }
                            alt="profile"
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-100" />
                        )}
                        <span className="block truncate font-medium text-gray-800">
                          {crews.find((c) => c._id === crew.crewId)?.name ||
                            "Pilih Crew"}
                        </span>
                      </div>
                      <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      </span>
                    </Listbox.Button>

                    {/* Options */}
                    <Listbox.Options className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-2xl bg-white py-2 shadow-xl ring-1 ring-black/10 focus:outline-none">
                      {crews.map((c) => (
                        <Listbox.Option
                          key={c._id}
                          value={c._id}
                          className={({ active }) =>
                            `group relative flex cursor-pointer select-none items-center gap-3 px-4 py-3 transition-all duration-150 ease-in-out ${
                              active
                                ? "bg-primary/5 text-primary"
                                : "text-gray-800"
                            }`
                          }
                        >
                          {({ selected }) => (
                            <>
                              <img
                                src={c.photo || "/default-avatar.png"}
                                alt="profile"
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <span
                                className={`truncate ${
                                  selected ? "font-semibold" : ""
                                }`}
                              >
                                {c.name}
                              </span>
                              {selected && (
                                <span className="ml-auto text-primary">
                                  <Check className="h-4 w-4" />
                                </span>
                              )}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>

                {/* Crew Role */}
                <input
                  type="text"
                  name="crewRole"
                  value={crew.crewRole}
                  onChange={(e) =>
                    handleCrewChange(index, "crewRole", e.target.value)
                  }
                  placeholder="Role"
                  className="input"
                />

                {/* Crew Percentage */}
                <input
                  type="number"
                  name="crewPercentage"
                  value={crew.crewPercentage}
                  onChange={(e) =>
                    handleCrewChange(
                      index,
                      "crewPercentage",
                      parseFloat(e.target.value)
                    )
                  }
                  placeholder="%"
                  className="input"
                />

                {/* Crew Share with Rp */}
                <div className="relative">
                  <input
                    type="text"
                    name="crewShare"
                    value={formatRupiahInput(crew.crewShare.toString())}
                    onChange={(e) => handleCrewChange(index, e)}
                    placeholder="Rp"
                    className="input pr-10"
                    required
                    disabled
                  />
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeCrewField(index)}
                  className="px-2 py-1 bg-[#841618] hover:bg-[#721419] text-white rounded-2xl"
                >
                  Remove
                </button>
              </div>
            ))}

            <Button type="button" onClick={addCrewField} variant="outline">
              + Add Crew
            </Button>
          </div>

          <Button
            type="submit"
            variant="default"
            className="w-max bg-[#841618] hover:bg-[#721419]"
          >
            Save Project
          </Button>
        </form>
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Daftar Projects
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b dark:border-neutral-700">
                  <th className="text-left py-2 px-4">Client</th>
                  <th className="text-left py-2 px-4">Date</th>
                  <th className="text-left py-2 px-4">Income</th>
                  <th className="text-left py-2 px-4">Imagine House</th>
                  <th className="text-left py-2 px-4">Crew</th>
                  <th className="text-left py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr
                    key={project._id}
                    className="border-b dark:border-neutral-700"
                  >
                    <td className="py-2 px-4">{project.client_name}</td>
                    <td className="py-2 px-4">
                      {new Date(project.date).toLocaleDateString("id-ID")}
                    </td>
                    <td className="py-2 px-4">
                      Rp{project.total_income.toLocaleString("id-ID")}
                    </td>
                    <td className="py-2 px-4">
                      Rp{project.imagine_share.toLocaleString("id-ID")}
                    </td>
                    <td
                      className="py-2 px-4 text-[#841618] hover:text-[#721419] underline cursor-pointer"
                      onClick={() => handleShowCrewDetail(project.crews)}
                    >
                      Rp{project.crew_share.toLocaleString("id-ID")}
                    </td>

                    <td className="py-2 px-4">
                      <button
                        onClick={() => confirmDeleteProject(project._id)}
                        className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg border border-[#841618] text-[#841618] hover:bg-[#841618] hover:text-white text-sm font-medium transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <AnimatePresence>
          {showDeleteModal && (
            <motion.div
              key="delete-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 w-[90%] max-w-md space-y-4"
              >
                <h2 className="text-xl font-semibold text-[#841618] dark:text-white">
                  Konfirmasi Hapus Project
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Apakah kamu yakin ingin menghapus project ini? Tindakan ini
                  tidak dapat dibatalkan.
                </p>
                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Batal
                  </Button>
                  <Button
                    variant="destructive"
                    className="bg-[#841618] hover:bg-[#721419]"
                    onClick={handleDeleteProject}
                  >
                    Hapus
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              key="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-neutral-800 rounded-2xl p-6 md:p-8 w-[90%] max-w-xl shadow-xl relative space-y-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-[#841618] dark:text-white">
                    Detail Crew Share
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-[#721419] transition"
                  >
                    <span className="text-lg font-bold">×</span>
                  </button>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-neutral-700">
                  <table className="min-w-full text-sm text-gray-700 dark:text-gray-200">
                    <thead className="bg-gray-100 dark:bg-neutral-700 text-xs uppercase text-[#841618] dark:text-gray-300">
                      <tr>
                        <th className="text-left px-4 py-2">Name</th>
                        <th className="text-left px-4 py-2">Role</th>
                        <th className="text-left px-4 py-2">Persentage</th>
                        <th className="text-left px-4 py-2">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                      {selectedCrewList.map((crew, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 capitalize">
                            {crew.crewName}
                          </td>
                          <td className="px-4 py-2 capitalize">
                            {crew.crewRole}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {crew.crewPercentage !== undefined &&
                            crew.crewPercentage !== null
                              ? `${crew.crewPercentage}%`
                              : "-"}
                          </td>
                          <td className="px-4 py-2">
                            Rp{crew.crewShare.toLocaleString("id-ID")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pt-2 text-right">
                  <Button
                    onClick={() => setShowModal(false)}
                    variant="outline"
                    className="mt-2"
                  >
                    Tutup
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

const SummaryCard = ({ title, amount }) => (
  <div className="bg-white dark:bg-neutral-800 p-4 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-sm">
    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
      {title}
    </h2>
    <p className="text-2xl font-bold text-[#841618]">
      Rp{amount.toLocaleString("id-ID")}
    </p>
  </div>
);

export default RevenueSharing;
