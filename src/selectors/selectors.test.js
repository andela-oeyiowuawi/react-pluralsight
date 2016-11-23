import expect from "expect";
import authorsFormattedForDropdown from './selectors';

describe("authorsFormattedForDropdown", ()=>{

  it('should return formatted author list', ()=>{
    const authors = [
      {id: "olalekan-lateef", firstName: 'Olalekan', lastName: "Olalekan"},
      {id: "eyio-lecqon", firstName: 'Eyio', lastName: "lecqon"}
    ];

    const formattedAuthors = [
      {value: "olalekan-lateef", text: "Olalekan Olalekan"},
      {value: "eyio-lecqon", text: "Eyio lecqon"}
    ];
    expect(authorsFormattedForDropdown(authors)).toEqual(formattedAuthors);
  });

});
