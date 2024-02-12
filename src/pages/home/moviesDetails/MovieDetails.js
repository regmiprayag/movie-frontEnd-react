import React from 'react'
import { Card } from 'flowbite-react';

const MovieDetails = (id) => {
  return (
    <div>
      <Card
          className="max-w-sm"
          imgAlt="Meaningful alt text for an image that is not purely decorative"
          imgSrc="https://www.koimoi.com/wp-content/new-galleries/2023/04/this-is-the-reason-why-pushpa-2-the-rule-has-broken-out-and-become-a-grass-root-phenomenon-read-on-001.jpg"
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {'title'}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {'description'}
          </p>
          <button className='bg-blue-400 text-white rounded-lg p-2'>Book Now</button>
        </Card>
    </div>
  )
}

export default MovieDetails