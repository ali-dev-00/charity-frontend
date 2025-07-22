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
import { AddAlumniDrawer } from "./add-alumni-management"
import AlumniService from "@/app/services/alumniService"
import { AlumniBase } from "@/app/services/types/alumniTypes"
import DeleteAlumni from "./delete-alumni"
import ViewAlumniDialog from "./view-alumni-dialog"
import UpdateAlumniDrawer from "./update-alumni-drawer"


export function AlumniManagementContent() {
  const [alumni, setAlumni] = useState<(AlumniBase & { _id: string })[]>([])
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  // For search, sort, and filter
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [filterExStudent, setFilterExStudent] = useState<string | null>(null)
  const [filterDegreeCertificate, setFilterDegreeCertificate] = useState<string | null>(null)
  const [filterGender, setFilterGender] = useState<string | null>(null)

  // Delete Modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [alumniIdToDelete, setAlumniIdToDelete] = useState<string | null>(null)

  const fetchAlumni = async () => {
    try {
      setLoading(true)
      const res = await AlumniService.getAll(page, limit) // Fetch without filters

      // Apply search filter
      const filteredData = res.items.data.filter((person) => {
        const matchesSearch =
          person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          person.email.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus = filterStatus ? person.orphanStatus === filterStatus : true
        const matchesExStudent = filterExStudent ? person.exStudent === filterExStudent : true
        const matchesDegreeCertificate = filterDegreeCertificate
          ? person.degreeCertificate === filterDegreeCertificate
          : true
        const matchesGender = filterGender ? person.gender === filterGender : true

        return (
          matchesSearch &&
          matchesStatus &&
          matchesExStudent &&
          matchesDegreeCertificate &&
          matchesGender
        )
      })

      // Apply sorting
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

      setAlumni(filteredData) // Set filtered and sorted alumni
      setTotalPages(Math.ceil(filteredData.length / limit)) // Update total pages for pagination
    } catch (err) {
      console.error("Error fetching alumni:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAlumni()
  }, [page, searchQuery, sortField, sortOrder, filterStatus, filterExStudent, filterDegreeCertificate, filterGender])

  const toggleAll = () => {
    if (selectAll) {
      setSelectedRows([]) // Deselect all
    } else {
      setSelectedRows(alumni.map((a) => a._id)) // Select all
    }
    setSelectAll(!selectAll) // Toggle select all state
  }

  const toggleRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id)) // Deselect row
    } else {
      setSelectedRows([...selectedRows, id]) // Select row
    }
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

  const handleDeleteClick = (alumniId: string) => {
    setAlumniIdToDelete(alumniId)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteSuccess = () => {
    setIsDeleteModalOpen(false)
    fetchAlumni() // Re-fetch the data after successful deletion
  }
  const [viewOpen, setViewOpen] = useState(false)
  const [alumniIdToView, setAlumniIdToView] = useState<string | null>(null)

  const handleViewClick = (id: string) => {
    setAlumniIdToView(id)
    setViewOpen(true)
  }

  const [editOpen, setEditOpen] = useState(false)
  const [alumniIdToEdit, setAlumniIdToEdit] = useState<string | null>(null)

  const handleEditClick = (id: string) => {
    setAlumniIdToEdit(id)
    setEditOpen(true)
  }
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-gray-900">Alumni Management</h1>
          <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
            {alumni?.length} users
          </Badge>
        </div>
        <AddAlumniDrawer />
      </div>

      {/* Search and Filter */}
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
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-gray-200 hover:bg-gray-100 text-gray-600 bg-transparent cursor-pointer">
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 bg-white border-gray-200 text-gray-500 ">
              <DropdownMenuItem onClick={() => setFilterStatus(null)} className="text-sm hover:bg-gray-100 cursor-pointer">
                All Statuses
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("orphan")} className="text-sm hover:bg-gray-100 cursor-pointer">
                Orphan
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("not-orphan")} className="text-sm hover:bg-gray-100 cursor-pointer">
                Not Orphan
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterExStudent("ex-student")} className="text-sm hover:bg-gray-100 cursor-pointer">
                Ex-Student
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterExStudent("ex-employee")} className="text-sm hover:bg-gray-100 cursor-pointer">
                Ex-Employee
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterGender("male")} className="text-sm hover:bg-gray-100 cursor-pointer">
                Male
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterGender("female")} className="text-sm hover:bg-gray-100 cursor-pointer">
                Female
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterDegreeCertificate("Bachelors")} className="text-sm hover:bg-gray-100 cursor-pointer">
                Bachelors
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterDegreeCertificate("Masters")} className="text-sm hover:bg-gray-100 cursor-pointer">
                Masters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            className="border-gray-200 text-gray-600 cursor-pointer hover:bg-gray-100"
            onClick={() => handleSort("name")}
          >
            <ArrowUpDown className="h-4 w-4 mr-2" /> Sort
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card className="border border-gray-200">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-4 text-left">
                    <Checkbox
                      checked={selectAll}
                      onCheckedChange={toggleAll}
                      className="border-gray-300"
                    />
                  </th>
                  <th
                    className="text-left p-4 text-sm font-medium text-gray-700 cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    Name
                  </th>
                  <th
                    className="text-left p-4 text-sm font-medium text-gray-700 cursor-pointer"
                    onClick={() => handleSort("email")}
                  >
                    Email
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">Phone / WhatsApp</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">City & Country</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">Old Degree</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="text-center py-6 text-gray-500">
                      Loading alumni data...
                    </td>
                  </tr>
                ) : (
                  alumni.map((person) => (
                    <tr key={person._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4">
                        <Checkbox
                          checked={selectedRows.includes(person._id)}
                          onCheckedChange={() => toggleRow(person._id)}
                          className="border-gray-300"
                        />
                      </td>
                      <td className="p-4 text-sm font-medium text-gray-600">{person.name}</td>
                      <td className="p-4 text-sm text-gray-600">{person.email}</td>
                      <td className="p-4 text-sm text-gray-600">
                        {person.cell_no} / {person.whatsappNo}
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {person.City}, {person.Country}
                      </td>
                      <td className="p-4">
                        <Badge
                          className={
                            person.orphanStatus === "orphan"
                              ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                          }
                        >
                          {person.orphanStatus}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{person.degreeCertificate}</td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer hover:bg-gray-200">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-36 bg-white border-gray-200 text-gray-500 ">
                            <DropdownMenuItem
                              className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-100"
                              onClick={() => handleViewClick(person._id)}
                            >
                              <Eye className="w-4 h-4" /> View
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              className="flex items-center gap-2 text-sm hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleEditClick(person._id)}
                            >
                              <Pencil className="w-4 h-4" /> Edit
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              className="flex items-center gap-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleDeleteClick(person._id)}
                            >
                              <Trash2 className="w-4 h-4" /> Delete
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

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={page === 1}
          className="flex items-center gap-2 border-gray-200 bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>

        <div className="flex items-center gap-1">
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              variant={page === i + 1 ? "default" : "outline"}
              size="sm"
              className="w-8 h-8 border-gray-200 text-gray-600"
            >
              {i + 1}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={handleNext}
          disabled={page === totalPages}
          className="flex items-center gap-2 border-gray-200 bg-transparent"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {alumniIdToView && (
        <ViewAlumniDialog
          open={viewOpen}
          alumniId={alumniIdToView}
          onOpenChange={setViewOpen}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && alumniIdToDelete && (
        <DeleteAlumni
          alumniId={alumniIdToDelete}
          onClose={() => setIsDeleteModalOpen(false)}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
      {alumniIdToEdit && (
        <UpdateAlumniDrawer
          open={editOpen}
          onOpenChange={setEditOpen}
          alumniId={alumniIdToEdit}
          onSuccess={() => {
            setEditOpen(false)
            fetchAlumni()
          }}
        />
      )}
    </div>
  )
}
