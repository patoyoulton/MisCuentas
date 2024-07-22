import React from 'react';
import { ButtonGroup, Button, DropdownButton, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const FilterComponent = ({ filter, handleFilterChange, handleMonthChange, availableMonths, availableYears }) => {
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return (
    <div className="mb-4">
      <h3>Filtrar Transacciones</h3>
      <div className="d-flex align-items-center mb-3">
        <Button variant="outline-primary" onClick={() => handleMonthChange(-1)}><FontAwesomeIcon icon={faChevronLeft} /></Button>
        <InputGroup className="ml-3 mr-3">
          <DropdownButton
            as={InputGroup.Prepend}
            variant="outline-secondary"
            title={`Mes: ${filter.month ? monthNames[parseInt(filter.month) - 1] : 'Todos'}`}
            id="input-group-dropdown-1"
          >
            {availableMonths.map(month => (
              <Dropdown.Item key={month} onClick={() => handleFilterChange('month', month.toString())}>{monthNames[month - 1]}</Dropdown.Item>
            ))}
          </DropdownButton>
          <FormControl
            as="select"
            value={filter.year}
            onChange={(e) => handleFilterChange('year', e.target.value)}
          >
            <option value="">Todos</option>
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </FormControl>
        </InputGroup>
        <Button variant="outline-primary" onClick={() => handleMonthChange(1)}><FontAwesomeIcon icon={faChevronRight} /></Button>
      </div>
    </div>
  );
};

export default FilterComponent;
