import { LocationNames, prefferdata } from '@/Data/staticData';
import React from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

const InternshipPreference = ({ formData, handleChange, errorlist }) => {

  // const handlePreferenceFunction = (selectedOptions) => {
  //   handleChange({
  //     target: {
  //       name: "preferredFunction",
  //       value: selectedOptions ? selectedOptions.map(option => option.value) : [],
  //     },
  //   });
  // };

  const handlePreferenceFunction = (selectedOptions) => {
    handleChange({
      target: {
        name: "preferredFunction",
        value: selectedOptions ? selectedOptions.value : "",
      },
    });
  };
  const handleLocationChange = (selectedOption) => {
    handleChange({
      target: {
        name: 'location',
        value: selectedOption ? selectedOption.value : null,
      },
    });
  };

  return (
    <div className='lg:grid lg:grid-cols-2 lg:gap-5'>
      <div>
        <label className="block mb-2 font-spartan  text-white">
          Preferred Function
          {errorlist.preferredFunction && <span className="text-red-500"> *</span>}
        </label>
        <Select
          isClearable
          onChange={handlePreferenceFunction}
          options={prefferdata}
          value={formData.preferredFunction ? { label: formData.preferredFunction, value: formData.preferredFunction } : null}
          className="border text-gray-700 rounded w-full"
        />

      </div>
      <div>
        <label className="block mb-2 font-spartan  text-white">
          Location
          {errorlist.location && <span className="text-red-500"> *</span>}
        </label>
        <Select
          isClearable
          onChange={handleLocationChange}
          options={LocationNames}
          value={formData.location ? { label: formData.location, value: formData.location } : null}
          className="border text-gray-700 rounded w-full"
        />
      </div>
    </div>
  );
};

export default InternshipPreference;






// import { LocationNames, prefferdata } from '@/Data/staticData';
// import React from 'react';
// import Select from 'react-select';
// import CreatableSelect from 'react-select/creatable';




// const InternshipPreference = ({ formData, handleChange,
//   errorlist
//  }) => {

//   const handle_perfference_function = (selectedOptions) => {
//     handleChange({
//       target: {
//         name: "preferredFunction",
//         value: selectedOptions
//           ? selectedOptions.map((option) => option.value)
//           : [],
//       },
//     });
//   };
//   return (
//     <div className='lg:grid lg:grid-cols-2 lg:gap-5'>
    
//      <div> <label className="block mb-2 text-white">Preferred Function
//       {errorlist.preferredFunction && <span className="text-red-500">  *</span>}
//      </label>
//       <CreatableSelect
//         isMulti
//         onChange={handle_perfference_function}


//         options={prefferdata}
        
      
        

//         value={formData.preferredFunction.map((spec) =>
//           prefferdata.find((s) => s.value === spec)
//         )}
//         className="mb-3"
//       /></div>
//      <div>
//      <label className="block mb-2 text-white">Location
//       {errorlist.location && <span className="text-red-500">  *</span>}
//      </label>
//       <Select
//         isClearable
//         onChange={selectedOption =>
//           handleChange({
//             target: {
//               name: 'location',
//              value: Array.isArray(selectedOption) ? selectedOption.map((option) => option.value) 
//               : [],
//             }
//           })
//         }
//         options={LocationNames}
//         value={formData.location ? { label: formData.location, value: formData.location } : null}
//         className="border text-gray-700 rounded w-full"
//       />
//      </div>
//     </div>
//   );
// };

// export default InternshipPreference;
