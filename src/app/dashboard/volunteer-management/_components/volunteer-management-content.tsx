"use client"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { AddVolunteerDrawer } from "./add-volunteer-management"
import VolunteerService from "@/app/services/VolunteerService"
import { VolunteerBase } from "@/app/services/types/volunteerTypes"
import DeleteVolunteer from "./delete-volunteer"
import ViewVolunteerDialog from "./view-volunteer-dialog"
import { AddVolunteerDrawer } from "./add-volunteer-management"
import { UpdateVolunteerDrawer } from "./update-volunteer-drawer"
// import UpdateVolunteerDrawer from "./update-volunteer-drawer"

export function VolunteerManagementContent() {
  const [volunteers, setVolunteers] = useState<(VolunteerBase & { _id: string })[]>([])
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [volunteerIdToDelete, setVolunteerIdToDelete] = useState<string | null>(null)

  const fetchVolunteers = async () => {
    try {
      setLoading(true)
      const res = await VolunteerService.getAll(page, limit)

      const filteredData = res.items.data.filter((person) =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.email.toLowerCase().includes(searchQuery.toLowerCase())
      )

      filteredData.sort((a, b) => {
        if (sortField === "name") {
          return sortOrder === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        }

        if (sortField === "email") {
          return sortOrder === "asc"
            ? a.email.localeCompare(b.email)
            : b.email.localeCompare(a.email)
        }

        return 0
      })

      setVolunteers(filteredData)
      setTotalPages(Math.ceil(filteredData.length / limit))
    } catch (err) {
      console.error("Error fetching volunteers:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVolunteers()
  }, [page, searchQuery, sortField, sortOrder])

  const toggleAll = () => {
    if (selectAll) {
      setSelectedRows([])
    } else {
      setSelectedRows(volunteers.map((v) => v._id))
    }
    setSelectAll(!selectAll)
  }

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    )
  }

  const handlePrev = () => {
    if (page > 1) setPage((p) => p - 1)
  }

  const handleNext = () => {
    if (page < totalPages) setPage((p) => p + 1)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSort = (field: string) => {
    const newOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc"
    setSortField(field)
    setSortOrder(newOrder)
  }

  const handleDeleteClick = (volunteerId: string) => {
    setVolunteerIdToDelete(volunteerId)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteSuccess = () => {
    setIsDeleteModalOpen(false)
    fetchVolunteers()
  }

  const [viewOpen, setViewOpen] = useState(false)
  const [volunteerIdToView, setVolunteerIdToView] = useState<string | null>(null)

  const handleViewClick = (id: string) => {
    setVolunteerIdToView(id)
    setViewOpen(true)
  }

  const [editOpen, setEditOpen] = useState(false)
  const [volunteerIdToEdit, setVolunteerIdToEdit] = useState<string | null>(null)

  const handleEditClick = (id: string) => {
    setVolunteerIdToEdit(id)
    setEditOpen(true)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-gray-900">Volunteer Management</h1>
          <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
            {volunteers?.length} users
          </Badge>
        </div>
        <AddVolunteerDrawer />
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search"
            className="pl-10 border-gray-200 focus:border-[#02544a] focus:ring-[#02544a]"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <Button
          variant="outline"
          className="border-gray-200 text-gray-600 cursor-pointer hover:bg-gray-100"
          onClick={() => handleSort("name")}
        >
          <ArrowUpDown className="h-4 w-4 mr-2" /> Sort
        </Button>
      </div>

      <Card className="border border-gray-200">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">
                    <Checkbox checked={selectAll} onCheckedChange={toggleAll}   className="border-gray-300" />
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700 cursor-pointer" onClick={() => handleSort("name")}>
                    Name
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700 cursor-pointer" onClick={() => handleSort("email")}>
                    Email
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">Phone</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">City</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-500">
                      Loading volunteers...
                    </td>
                  </tr>
                ) : (
                  volunteers.map((person) => (
                    <tr key={person._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4 text-sm font-medium text-gray-600">
                        <Checkbox
                          checked={selectedRows.includes(person._id)}
                          onCheckedChange={() => toggleRow(person._id)}
                            className="border-gray-300"
                        />
                      </td>
                      <td className="p-4 text-sm font-medium text-gray-600">{person.name}</td>
                      <td className="p-4 text-sm font-medium text-gray-600">{person.email}</td>
                      <td className="p-4 text-sm font-medium text-gray-600">{person.cell_no}</td>
                      <td className="p-4 text-sm font-medium text-gray-600">{person.City}</td>
                      <td className="p-4 text-sm font-medium text-gray-600">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer hover:bg-gray-200">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-36 bg-white border-gray-200 text-gray-500 ">
                            <DropdownMenuItem onClick={() => handleViewClick(person._id)}  className="flex items-center gap-2 text-sm hover:bg-gray-100 cursor-pointer">
                              <Eye className="w-4 h-4 mr-2" /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditClick(person._id)}  className="flex items-center gap-2 text-sm hover:bg-gray-100 cursor-pointer">
                              <Pencil className="w-4 h-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                             className="flex items-center gap-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleDeleteClick(person._id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between mt-6">
        <Button variant="outline" onClick={handlePrev} disabled={page === 1}  className="flex items-center gap-2 border-gray-200 bg-transparent">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>

        <div className="flex items-center gap-1">
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              variant={page === i + 1 ? "default" : "outline"}
              size="sm"
              className="w-8 h-8"
            >
              {i + 1}
            </Button>
          ))}
        </div>

        <Button variant="outline" onClick={handleNext} disabled={page === totalPages}  className="flex items-center gap-2 border-gray-200 bg-transparent">
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {volunteerIdToView && (
        <ViewVolunteerDialog open={viewOpen} volunteerId={volunteerIdToView} onOpenChange={setViewOpen} />
      )}

      {isDeleteModalOpen && volunteerIdToDelete && (
        <DeleteVolunteer
          volunteerId={volunteerIdToDelete}
          onClose={() => setIsDeleteModalOpen(false)}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}

      {volunteerIdToEdit && (
        <UpdateVolunteerDrawer
          open={editOpen}
          onOpenChange={setEditOpen}
          volunteerId={volunteerIdToEdit}
          onSuccess={() => {
            setEditOpen(false)
            fetchVolunteers()
          }}
        />
      )}
    </div>
  )
}
