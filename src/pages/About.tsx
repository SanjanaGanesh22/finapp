import React from 'react'

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About FinApp</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <p className="text-gray-600 mb-6">
          FinApp is a modern financial management application designed to help you
          take control of your finances. Built with React and TypeScript, it
          provides a secure and intuitive interface for managing your money.
        </p>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Features</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Expense tracking and categorization</li>
            <li>Budget planning and monitoring</li>
            <li>Financial goal setting</li>
            <li>Secure data storage</li>
            <li>Responsive design for all devices</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default About 