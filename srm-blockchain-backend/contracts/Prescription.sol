// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PrescriptionContract
 * @dev Stores and verifies medical prescriptions on the blockchain.
 */
contract PrescriptionContract {
    struct Prescription {
        bytes32 prescriptionHash;
        address doctor;
        address patient;
        uint256 issuedTimestamp;
        bool isDispensed;
        address dispensedByPharmacy;
        uint256 dispensedTimestamp;
    }

    mapping(bytes32 => Prescription) public prescriptions;
    mapping(address => bytes32[]) public patientPrescriptions;

    event PrescriptionCreated(bytes32 indexed prescriptionHash, address indexed doctor, address indexed patient, uint256 timestamp);
    event PrescriptionDispensed(bytes32 indexed prescriptionHash, address indexed pharmacy, uint256 timestamp);

    /**
     * @dev Creates a new prescription record.
     * @param _hash The unique hash of the prescription data.
     * @param _patientAddress The patient's wallet address.
     */
    function createPrescription(bytes32 _hash, address _patientAddress) public {
        require(prescriptions[_hash].issuedTimestamp == 0, "Prescription already exists");
        prescriptions[_hash] = Prescription({
            prescriptionHash: _hash,
            doctor: msg.sender,
            patient: _patientAddress,
            issuedTimestamp: block.timestamp,
            isDispensed: false,
            dispensedByPharmacy: address(0),
            dispensedTimestamp: 0
        });
        patientPrescriptions[_patientAddress].push(_hash);
        emit PrescriptionCreated(_hash, msg.sender, _patientAddress, block.timestamp);
    }

    /**
     * @dev Validates a prescription's existence and status.
     * @param _hash The hash of the prescription to validate.
     * @return isValid True if the prescription exists.
     * @return isDispensed True if the prescription has been dispensed.
     * @return timestamp The timestamp when the prescription was issued.
     */
    function validatePrescription(bytes32 _hash) public view returns (bool isValid, bool isDispensed, uint256 timestamp) {
        Prescription storage p = prescriptions[_hash];
        return (p.issuedTimestamp > 0, p.isDispensed, p.issuedTimestamp);
    }

    /**
     * @dev Marks a prescription as dispensed.
     * @param _hash The hash of the prescription to mark.
     */
    function markDispensed(bytes32 _hash) public {
        Prescription storage p = prescriptions[_hash];
        require(p.issuedTimestamp > 0, "Prescription does not exist");
        require(!p.isDispensed, "Prescription already dispensed");
        
        p.isDispensed = true;
        p.dispensedByPharmacy = msg.sender;
        p.dispensedTimestamp = block.timestamp;
        
        emit PrescriptionDispensed(_hash, msg.sender, block.timestamp);
    }

    /**
     * @dev Retrieves all prescription hashes for a given patient.
     * @param _patientAddress The patient's address.
     * @return An array of prescription hashes.
     */
    function getPrescriptionHistory(address _patientAddress) public view returns (bytes32[] memory) {
        return patientPrescriptions[_patientAddress];
    }
}
