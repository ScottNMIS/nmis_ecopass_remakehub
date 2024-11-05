// machineData.js

// Clean up field names for easier access
const cleanFieldName = (field) => {
    return field
        .replace(/\n/g, '')
        .replace(/[()]/g, '')
        .replace(/\s+/g, '_')
        .replace(/[`']/g, '')
        .replace(/-/g, '_')
        .toLowerCase();
};

// Full machine data from CSV
export const machines = [
    { no: "1", name: "Kone Overhead Crane", predId: "43", port: "25001" },
    { no: "3", name: "Heating Station", predId: "17", port: "25003" },
    { no: "4", name: "Phoenix High Strain Tester", predId: "23", port: "25004" },
    { no: "5", name: "CMI Bespoke Gas Furnace", predId: "10", port: "25005" },
    { no: "6", name: "Instron Torsion Tester", predId: "19", port: "25006" },
    { no: "7", name: "EDM Hole Drill", predId: "36", port: "25007" },
    { no: "8", name: "Wire EDM FL440 CCS", predId: "4", port: "25008" },
    { no: "9", name: "Surface Grinder 524 Easy", predId: "20", port: "25009" },
    { no: "10", name: "HAAS CNC Mill TM-2", predId: "14", port: "25010" },
    { no: "11", name: "Pillar Drill", predId: "50", port: "25011" },
    { no: "12", name: "Carbolite GPC12/131", predId: "7", port: "25012" },
    { no: "13", name: "Quench Tank", predId: "53", port: "25013" },
    { no: "14", name: "Polymer Quench Tank", predId: "52", port: "25014" },
    { no: "15", name: "A Frame Hoist", predId: "32", port: "25015" },
    { no: "16", name: "100 Tonne Press (Supply 1)", predId: "33", port: "25016" },
    { no: "17", name: "100 Tonne Press (Supply 2)", predId: "", port: "25016" },
    { no: "18", name: "Crane RF Welder", predId: "34", port: "25018" },
    { no: "19", name: "SPF Crane (6.3t Crane)", predId: "35", port: "25019" },
    { no: "20", name: "FANUC Gantry", predId: "11", port: "25020" },
    { no: "22", name: "Wire EDM Cut 400sp", predId: "28", port: "25022" },
    { no: "23", name: "Wire EDM Robofil 440 CC", predId: "5", port: "25023" },
    { no: "23a (80)", name: "EDM Robofill 440 CC Chiller", predId: "116", port: "25080" },
    { no: "24", name: "Sand Blast Unit", predId: "47", port: "25024" },
    { no: "25", name: "XYZ RLX355", predId: "58", port: "25025" },
    { no: "26", name: "XYZ RMX2500", predId: "59", port: "25026" },
    { no: "27", name: "Chiller 2 Lab1 BUP1000", predId: "60", port: "25027" },
    { no: "28", name: "Ambrell ECOHeat", predId: "6", port: "25028" },
    { no: "29", name: "Cosmotec Industrial Cooler", predId: "39", port: "25029" },
    { no: "30", name: "EDM FL440-Chiller", predId: "106", port: "25030" },
    { no: "31", name: "HAAS CNC Lathe TL-1", predId: "13", port: "25031" },
    { no: "32", name: "Cosen G320NC Bandsaw", predId: "38", port: "25032" },
    { no: "33", name: "Emissivity Furnace", predId: "30", port: "25033" },
    { no: "34", name: "Nederman Filter Cart", predId: "46", port: "25034" },
    { no: "35", name: "PFS Spray Booth", predId: "49", port: "25035" },
    { no: "36", name: "EDM Cut - Chiller", predId: "107", port: "25036" },
    { no: "37", name: "Sheet Metal Guillotine", predId: "54", port: "25037" },
    { no: "38", name: "Vertical Bandsaw", predId: "57", port: "25038" },
    { no: "39", name: "TIG Weld", predId: "56", port: "25039" },
    { no: "40", name: "Pedestal Grinder", predId: "48", port: "25040" },
    { no: "41", name: "Lincat Oven", predId: "44", port: "25041" },
    { no: "42", name: "MIG Weld", predId: "45", port: "25042" },
    { no: "43", name: "Plasma Cutter", predId: "51", port: "25043" },
    { no: "46", name: "Beckhoff Trolley", predId: "37", port: "25046" },
    { no: "48", name: "Temp Recorder (Eurotherm)", predId: "55", port: "25048" },
    { no: "49", name: "Induction Oscillator (Heater)", predId: "42", port: "25049" },
    { no: "50", name: "R0001AFR Schuler AG 2100 Tonne Screw Press", predId: "24", port: "25050" },
    { no: "51", name: "ACB Loire 200T Superplastic Forming Press", predId: "3", port: "25051" },
    { no: "52", name: "ACB 1200T SPF/600T HCF Press (Supply 1)", predId: "2", port: "25052" },
    { no: "53", name: "ACB 1200T SPF/600T HCF Press (Supply 2)", predId: "", port: "25052" },
    { no: "54", name: "Schuler Multiforge 3500kN", predId: "25", port: "25054" },
    { no: "55", name: "HARE clipping press Model 63HP", predId: "16", port: "25055" },
    { no: "56", name: "Jean Perrot Maneo CNC Press-Brake", predId: "64", port: "25056" },
    { no: "57", name: "WF Flow Former STR 600-316", predId: "27", port: "25057" },
    { no: "58", name: "500 Tonne Hydraulic Press", predId: "1", port: "25058" },
    { no: "59", name: "Carbolite furnace HRF 7/324", predId: "8", port: "25059" },
    { no: "60", name: "Carbolite furnace LCF 14/350", predId: "9", port: "25060" },
    { no: "61", name: "Electrotherm Rotary Furnace 5700", predId: "29", port: "25061" },
    { no: "62", name: "VFE/TAV TPH25/25/35 Horizontal Vacuum Furnace", predId: "108", port: "25062" },
    { no: "63", name: "GFM Radial Forge SKK10", predId: "12", port: "25063" },
    { no: "64", name: "VUD600 Flow Former", predId: "26", port: "25064" },
    { no: "65", name: "MTI 125T Rotary Friction Welder", predId: "21", port: "25065" },
    { no: "65a (81)", name: "MTI 125T Rotary Friction Welder Supply 2", predId: "", port: "25065" },
    { no: "66", name: "MTI 300T Rotary Friction Welding", predId: "22", port: "25066" },
    { no: "67", name: "Future Forge Data Hub", predId: "40", port: "25067" },
    { no: "68", name: "DMG MORI DMU 125 FD Duo Block", predId: "63", port: "25068" },
    { no: "69", name: "DMG MORI HSC 75 Deckel Maho CNC", predId: "62", port: "25069" },
    { no: "70", name: "Matsuura MX-520", predId: "65", port: "25070" },
    { no: "71", name: "DMG NLX 2500 / 700 SY Lathe", predId: "66", port: "25071" },
    { no: "72", name: "Hybrid LMD Quaser MV235", predId: "61", port: "25072" },
    { no: "73", name: "Beckhoff Additive Control for LMD Quasar(INV#021791)", predId: "109", port: "25073" },
    { no: "74", name: "Beckhoff Additive Control for LMD Quasar - LASER", predId: "110", port: "25074" },
    { no: "75", name: "LMD Hybrid LEV", predId: "111", port: "25075" },
    { no: "76", name: "Nikken Presetter", predId: "112", port: "25076" },
    { no: "77", name: 'SECO "EasyShrink Evo"', predId: "113", port: "25077" },
    { no: "78", name: "Tool vending machines x2", predId: "114", port: "25078" },
    { no: "79", name: "Smart Workbench", predId: "115", port: "25079" }
];


// Utility functions
export const getMachineByCode = (code) => {
    return machines.find(machine => machine.predator_port === code);
};

export const getMachineById = (id) => {
    return machines.find(machine => machine.predator_machine_id === id);
};

export const getMachinesByLocation = (location) => {
    return machines.filter(machine => machine.machine_location === location);
};

export const getLocations = () => {
    return [...new Set(machines.map(machine => machine.machine_location))];
};

// Get machines by any field
export const getMachinesByField = (field, value) => {
    return machines.filter(machine => machine[field] === value);
};

// Get all unique values for a field
export const getUniqueFieldValues = (field) => {
    return [...new Set(machines.map(machine => machine[field]))].filter(Boolean);
};

// Get all phases types
export const getPhaseTypes = () => {
    return getUniqueFieldValues('phase_type');
};

// Get all power protocols
export const getPowerProtocols = () => {
    return getUniqueFieldValues('power_protocol');
};

// Get all data protocols
export const getDataProtocols = () => {
    return getUniqueFieldValues('data_protocol');
};

// Search machines by name
export const searchMachines = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    return machines.filter(machine =>
        machine.asset_description.toLowerCase().includes(term)
    );
};