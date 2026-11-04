import express from 'express';
import MonitoredService from '../models/MonitoredService.js';
import { pingService, checkAllServices } from '../utils/healthMonitor.js';
import { testTelegramConnection, sendTelegramAlert } from '../utils/telegramAlert.js';
import { getClientServicesStatus, checkAllClientServices } from '../utils/clientServicesMonitor.js';

const router = express.Router();

// GET all monitored services
router.get('/services', async (req, res) => {
  try {
    const services = await MonitoredService.find().sort({ createdAt: -1 });
    res.json({ success: true, services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST add a new service to monitor
router.post('/services', async (req, res) => {
  try {
    const { name, url, healthPath = '/', checkIntervalMinutes = 10 } = req.body;
    if (!name || !url) {
      return res.status(400).json({ success: false, message: 'Name and URL are required.' });
    }

    const newService = await MonitoredService.create({
      name,
      url,
      healthPath,
      checkIntervalMinutes,
      isActive: true,
    });

    // Run immediate first ping in background
    pingService(newService);

    res.status(201).json({ success: true, service: newService });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT update a service
router.put('/services/:id', async (req, res) => {
  try {
    const { name, url, healthPath, checkIntervalMinutes, isActive } = req.body;
    const updated = await MonitoredService.findByIdAndUpdate(
      req.params.id,
      { name, url, healthPath, checkIntervalMinutes, isActive },
      { new: true }
    );
    res.json({ success: true, service: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE a service
router.delete('/services/:id', async (req, res) => {
  try {
    await MonitoredService.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Service removed from monitoring.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST manual ping single service
router.post('/ping/:id', async (req, res) => {
  try {
    const service = await MonitoredService.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    const result = await pingService(service);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST manual ping all services
router.post('/ping-all', async (req, res) => {
  try {
    await checkAllServices();
    const services = await MonitoredService.find().sort({ createdAt: -1 });
    res.json({ success: true, message: 'All services pinged successfully', services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST test Telegram connection
router.post('/test-telegram', async (req, res) => {
  try {
    const sent = await testTelegramConnection();
    if (sent) {
      res.json({ success: true, message: '✅ Test alert delivered to your Telegram successfully!' });
    } else {
      res.status(400).json({ success: false, message: '❌ Could not deliver message to Telegram. Check bot token and chat ID.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET client project services status (Sakthi Brevo, Chocolate Mine SMTP & Telegram)
router.get('/client-services', async (req, res) => {
  try {
    const result = await getClientServicesStatus();
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST manual check of all client project services with instant Telegram notification
router.post('/check-client-services', async (req, res) => {
  try {
    const result = await checkAllClientServices(true);
    res.json({
      success: true,
      message: 'Client services checked and Telegram summary dispatched!',
      ...result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
