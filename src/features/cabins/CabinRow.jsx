import { useState } from "react";
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateEditCabin } from "./useCreateEditCabin";
import Menus from "../../ui/Menus";
import { TableRow } from "../../ui/Table";
const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image,
  } = cabin;

  const { isDeleting, mutate: deleteCabin } = useDeleteCabin();
  const { isLoading, mutate } = useCreateEditCabin();

  function handleDuplicate() {
    mutate({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  function handleDelete() {
    setShowDelete(true);
  }

  function handleEdit() {
    setShowForm(true);
  }

  function handleToggleMenu() {
    setOpenMenuId(openMenuId === cabinId ? null : cabinId);
  }

  function handleCloseMenu() {
    setOpenMenuId(null);
  }

  const menuOptions = [
    { label: "Duplicate", onClick: handleDuplicate },
    { label: "Edit", onClick: handleEdit },
    { label: "Delete", onClick: handleDelete },
  ];
  return (
    <TableRow columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Img src={image} alt={name} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{discount > 0 ? formatCurrency(discount) : "-"}</Discount>
      <Menus
        onDuplicate={handleDuplicate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isOpen={openMenuId === cabinId}
        onToggle={handleToggleMenu}
        onClose={handleCloseMenu}
        options={menuOptions}
      />

      {showDelete && (
        <Modal onCloseModal={() => setShowDelete(false)}>
          <ConfirmDelete
            resourceName={cabin.name}
            onConfirm={() => deleteCabin(cabinId)}
            onCloseModal={() => setShowDelete(false)}
            disabled={isDeleting}
          />
        </Modal>
      )}

      {showForm && (
        <Modal onCloseModal={() => setShowForm(false)}>
          <CreateCabinForm
            cabinToEdit={cabin}
            onCloseModal={() => setShowForm(false)}
          />
        </Modal>
      )}
    </TableRow>
  );
}

export default CabinRow;
