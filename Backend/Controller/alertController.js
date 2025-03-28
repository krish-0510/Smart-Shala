import Alert from '../Models/Alert.js';

export const createAlert = async (req, res) => {
    try {
        const { emergencyType, severity, location } = req.body;
        const alert = new Alert({ emergencyType, severity, location });
        await alert.save();
        console.log(alert);
        
        res.status(201).json({ message: 'Alert created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find();
        res.status(200).json(alerts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
// Delete Alert
export const deleteAlert = async (req, res) => {
    try {
        const { id } = req.params; // Extract alert ID from URL params
        const alert = await Alert.findByIdAndDelete(id);

        if (!alert) {
            return res.status(404).json({ message: 'Alert not found' });
        }

        res.status(200).json({ message: 'Alert deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
