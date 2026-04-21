export default function PrivacyPage() {
    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px", fontFamily: "sans-serif" }}>
            <h1>Privacy Policy</h1>
            <p>Last updated: April 21, 2026</p>

            <h2>Overview</h2>
            <p>Job Tracker Extension is a browser extension that helps you track job applications from LinkedIn to your personal job-tracker.in dashboard.</p>

            <h2>Data We Collect</h2>
            <p>The extension reads the following data from LinkedIn job pages when you click "Add to Job Tracker":</p>
            <ul>
                <li>Job title</li>
                <li>Company name</li>
                <li>Job location</li>
                <li>Job URL</li>
            </ul>

            <h2>How We Use Your Data</h2>
            <p>The data collected is used solely to save your job applications to your personal job-tracker.in dashboard. We do not sell, share, or transfer your data to any third parties.</p>

            <h2>Authentication</h2>
            <p>The extension uses your existing job-tracker.in session to authenticate API requests. Your credentials are never stored in the extension.</p>

            <h2>Local Storage</h2>
            <p>The extension temporarily stores your authentication token in browser local storage to facilitate API requests. This token is never shared with third parties.</p>

            <h2>Contact</h2>
            <p>If you have any questions about this privacy policy, contact us at: keyankarthik01@gmail.com</p>
        </div>
    )
}