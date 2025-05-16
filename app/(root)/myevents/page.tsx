"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface TextAreasState {
  [key: number]: boolean;
}

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

const users = [
  { id: 1, name: "Prank" },
  { id: 2, name: "Shadow" },
  { id: 3, name: "Random" },
  { id: 4, name: "Person" },
];

export default function MyEvents() {
  // Track the open text area state for each user individually with their ID
  const [openTextAreas, setOpenTextAreas] = useState<TextAreasState>({});

  const handleSubmit = (userId: number): void => {
    setOpenTextAreas((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  return (
    <div className="py-32 px-28">
      <h1 className="text-4xl font-semibold select-none pb-16">
        My Created Events:
      </h1>
      <Table className="text-lg">
        <TableCaption>Your all event details</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Users attending event</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="cursor-pointer">Show all users</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>All User Info</DialogTitle>
                      <DialogDescription>
                        The list of users attending this event.
                      </DialogDescription>
                    </DialogHeader>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">User</TableHead>
                          <TableHead className="text-right">
                            Registration
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell className="text-right space-x-2">
                              {openTextAreas[user.id] && (
                                <div className="mb-2">
                                  <Textarea placeholder="Reason for cancellation" />
                                </div>
                              )}

                              <Button
                                type="submit"
                                variant="destructive"
                                className="cursor-pointer"
                                onClick={() => handleSubmit(user.id)}
                              >
                                {openTextAreas[user.id]
                                  ? "Submit"
                                  : "Cancel Registration"}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <DialogFooter />
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        </TableFooter>
      </Table>
    </div>
  );
}
