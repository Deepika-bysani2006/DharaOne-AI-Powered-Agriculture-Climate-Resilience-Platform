# DharaOne-AI-Powered-Agriculture-Climate-Resilience-Platform
🌱 AI-powered agriculture platform that transforms crop images, weather conditions, and field information into actionable farming guidance with Vana AI.
# 🌱 DharaOne

### AI-Powered Agriculture & Climate Resilience Platform

DharaOne is an AI-powered web application designed to help farmers make
better, faster, and more informed decisions by connecting real-world
field conditions with intelligent agricultural guidance.

The platform combines crop disease detection, weather-aware recommendations,
pesticide and treatment information, crop health history, and an AI-powered
agricultural assistant called **Vana AI**.

---

## 🌾 Problem

Farmers often have to make critical decisions based on:

- Unclear crop symptoms
- Limited access to agricultural experts
- Changing weather conditions
- Difficulty identifying crop diseases
- Uncertainty about suitable treatments and pesticides
- Lack of historical crop health information

A wrong decision at the wrong time can lead to crop damage,
unnecessary pesticide usage, and financial losses.

DharaOne aims to bridge this gap by turning raw field information
into simple and actionable agricultural guidance.

---

## 💡 Solution

DharaOne acts as a real-time bridge between:

**Field Conditions → AI Analysis → Agricultural Guidance → Action**

Farmers can provide information such as:

📷 Crop images  
🌱 Crop details  
📍 Location  
🌦️ Weather conditions  
💬 Natural-language questions  

DharaOne processes this information and presents understandable
recommendations through an easy-to-use interface.

---

# 🤖 Vana AI

**Vana AI** is the built-in agricultural AI assistant inside DharaOne.

Vana helps farmers ask questions about:

- Crop health
- Crop diseases
- Pests
- Treatment options
- Pesticide information
- Weather-related farming decisions
- General crop-care guidance

### Example

> "My tomato leaves have brown spots. What should I do?"

Vana AI can guide the farmer through the next steps and connect
the query with crop and weather information.

---

# 📷 Crop Disease Scanner

DharaOne provides an AI-powered crop disease scanning workflow.

Farmers can:

1. Open the crop scanner
2. Capture or upload a crop image
3. Submit the image for analysis
4. Receive an AI-generated diagnosis
5. View confidence/risk information
6. Review recommended next steps
7. Check treatment information
8. Review weather conditions before acting

The scanner is designed to make crop diagnosis easier for users
who may not have immediate access to agricultural experts.

---

# 🧪 Pesticide & Treatment Information

DharaOne includes a treatment and pesticide information section
to help users understand which treatment categories are relevant
to particular crops, pests, and diseases.

Users can search by:

- Crop
- Disease
- Pest
- Treatment
- Active ingredient

The interface provides crop-specific guidance and safety context.

> ⚠️ Treatment recommendations should always be verified against
> registered product labels and local agricultural guidance before use.

---

# 📜 Crop Health History

DharaOne keeps track of crop health activity so farmers can review
changes over time.

The history interface can contain:

- Previous crop scans
- Detected diseases
- Crop health status
- Risk level
- Scan date
- Treatment-related information

This helps farmers identify recurring problems and monitor crop health.

---

# 🌦️ Weather-Aware Agriculture

Weather can strongly influence agricultural decisions.

DharaOne incorporates weather information to help users understand
whether the timing of a farming action is appropriate.

For example:

**Disease detected**
+
**Rain expected tomorrow**
=
**Review treatment timing before spraying**

This helps connect disease diagnosis with real-world field conditions.

---

# 🔐 Authentication

DharaOne supports secure user authentication using Firebase Authentication.

Authentication features include:

- Email & password sign up
- Email & password login
- Google Sign-In
- Forgot password
- Logout
- Protected routes
- Persistent authentication state
- User profile information

---

# 🎨 Design System

DharaOne uses an agriculture-inspired color system based on natural
greens, earth tones, and neutral shades.

| Color | HEX |
|---|---|
| Forest Black | `#131B10` |
| Olive | `#75853E` |
| Leaf Green | `#598923` |
| Earth | `#AE7B6A` |
| Forest Gray | `#4B6961` |
| Deep Olive | `#576E1C` |
| Crop Green | `#447112` |
| Forest | `#334E3D` |
| Sage | `#84AF56` |
| Dark Forest | `#203015` |
| Deep Green | `#2C5006` |
| Soft Gray | `#B3B5C2` |

The interface also supports:

- Light mode
- Dark mode
- System theme preference
- Responsive layouts

---

# 🖥️ Main Features

### 🏠 Dashboard
Central overview of:

- Crop health
- Active alerts
- Weather
- Recent scans
- Recommended actions

### 🤖 Vana AI
AI-powered agricultural assistant for natural-language questions.

### 📷 Crop Disease Scanner
Upload or capture crop images for AI-powered disease analysis.

### 🧪 Treatments
Search and explore crop-specific pest, disease, and treatment information.

### 📜 Crop History
Track previous crop scans and health status.

### 🌦️ Weather
View weather information and understand its relevance to farming actions.

### 🔐 Authentication
Secure login and registration with Firebase.

### 🌓 Theme Switching
Light, dark, and system theme support.

---

# 🏗️ Application Structure

```text
DharaOne
│
├── 🏠 Dashboard
│
├── 🤖 Vana AI
│
├── 📷 Crop Disease Scanner
│
├── 🔍 AI Diagnosis
│
├── 🧪 Treatments & Pesticides
│
├── 📜 Crop History
│
├── 🌦️ Weather
│
├── 🔐 Authentication
│   ├── Login
│   ├── Sign Up
│   └── Forgot Password
│
└── ⚙️ Settings
    └── Theme
