"use client"
import { useState, useEffect } from 'react';

import axios from 'axios';

interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
}

// Main page component
export default function Home() {




  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Todo App</h1>

    </div>
  );
}
