"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ArrowLeft, CheckCircle, Clock, Trash2, Eye } from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("pending-professionals")
  const [professionals, setProfessionals] = useState([
    { id: 1, name: "Sarah Johnson", profession: "Hair Stylist", status: "pending", joinDate: "2025-12-10" },
    { id: 2, name: "Mike Williams", profession: "Plumber", status: "pending", joinDate: "2025-12-09" },
    { id: 3, name: "Emma Davis", profession: "Electrician", status: "approved", joinDate: "2025-12-05" },
  ])

  const [reportedPosts, setReportedPosts] = useState([
    {
      id: 1,
      reporter: "User123",
      reportedProfessional: "John Doe",
      reason: "Inappropriate content",
      date: "2025-12-10",
    },
    { id: 2, reporter: "User456", reportedProfessional: "Jane Smith", reason: "Spam", date: "2025-12-09" },
  ])

  const [disputes, setDisputes] = useState([
    {
      id: 1,
      user: "John Doe",
      professional: "Sarah Johnson",
      issue: "Service not completed",
      amount: "$150",
      status: "open",
    },
    {
      id: 2,
      user: "Jane Smith",
      professional: "Mike Williams",
      issue: "Quality issue",
      amount: "$100",
      status: "resolving",
    },
  ])

  const handleApproveProfessional = (id: number) => {
    setProfessionals(professionals.map((p) => (p.id === id ? { ...p, status: "approved" } : p)))
  }

  const handleRejectProfessional = (id: number) => {
    setProfessionals(professionals.filter((p) => p.id !== id))
  }

  const handleDeletePost = (id: number) => {
    setReportedPosts(reportedPosts.filter((p) => p.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#DC143C] to-red-600 text-white p-6">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/home">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Approvals</p>
                <p className="text-3xl font-bold text-yellow-600">8</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Reported Posts</p>
                <p className="text-3xl font-bold text-red-600">5</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Disputes</p>
                <p className="text-3xl font-bold text-orange-600">3</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Commission</p>
                <p className="text-3xl font-bold text-[#DC143C]">$12,450</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="pending-professionals">Professionals</TabsTrigger>
            <TabsTrigger value="reported-posts">Reported Posts</TabsTrigger>
            <TabsTrigger value="disputes">Disputes</TabsTrigger>
            <TabsTrigger value="money-flow">Money Flow</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          {/* Professionals Tab */}
          <TabsContent value="pending-professionals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Professional Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {professionals.map((professional) => (
                    <div key={professional.id} className="p-4 border border-gray-300 rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-foreground">{professional.name}</p>
                            {professional.status === "approved" && <CheckCircle className="w-5 h-5 text-green-600" />}
                            {professional.status === "pending" && <Clock className="w-5 h-5 text-yellow-600" />}
                          </div>
                          <p className="text-sm text-gray-600">{professional.profession}</p>
                          <p className="text-xs text-gray-500">Joined: {professional.joinDate}</p>
                        </div>
                        {professional.status === "pending" && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => handleApproveProfessional(professional.id)}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRejectProfessional(professional.id)}
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reported Posts Tab */}
          <TabsContent value="reported-posts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Manage Reported Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reportedPosts.map((post) => (
                    <div key={post.id} className="p-4 border border-gray-300 rounded-lg">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{post.reportedProfessional}</p>
                          <p className="text-sm text-gray-600">Reported by: {post.reporter}</p>
                          <p className="text-sm text-gray-600 mt-1">Reason: {post.reason}</p>
                          <p className="text-xs text-gray-500 mt-1">Date: {post.date}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeletePost(post.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Disputes Tab */}
          <TabsContent value="disputes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Resolve Disputes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {disputes.map((dispute) => (
                    <div key={dispute.id} className="p-4 border border-gray-300 rounded-lg">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">
                            {dispute.user} vs {dispute.professional}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">Issue: {dispute.issue}</p>
                          <p className="text-sm text-[#DC143C] font-semibold mt-1">Amount: {dispute.amount}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Status:{" "}
                            <span className={dispute.status === "open" ? "text-red-600" : "text-yellow-600"}>
                              {dispute.status}
                            </span>
                          </p>
                        </div>
                        <Button size="sm" className="bg-[#DC143C] hover:bg-red-700 text-white">
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Money Flow Tab */}
          <TabsContent value="money-flow" className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Total Escrow</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-[#DC143C]">$5,230</p>
                  <p className="text-sm text-gray-600 mt-2">Held in escrow accounts</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Total Payouts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-600">$8,920</p>
                  <p className="text-sm text-gray-600 mt-2">Released to professionals</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Commission Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-foreground">$12,450</p>
                  <p className="text-sm text-gray-600 mt-2">10% platform fee</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="text-left py-2 px-2 font-semibold">Type</th>
                        <th className="text-left py-2 px-2 font-semibold">Professional</th>
                        <th className="text-left py-2 px-2 font-semibold">Amount</th>
                        <th className="text-left py-2 px-2 font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-2">Escrow Hold</td>
                        <td className="py-2 px-2">Sarah Johnson</td>
                        <td className="py-2 px-2 text-yellow-600">$150</td>
                        <td className="py-2 px-2">2025-12-10</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-2">Payout</td>
                        <td className="py-2 px-2">Mike Williams</td>
                        <td className="py-2 px-2 text-green-600">$540</td>
                        <td className="py-2 px-2">2025-12-09</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2">Commission</td>
                        <td className="py-2 px-2">Platform Fee</td>
                        <td className="py-2 px-2 text-[#DC143C] font-semibold">$69</td>
                        <td className="py-2 px-2">2025-12-09</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Manage Professional Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {["Hair Stylist", "Plumber", "Electrician", "Carpenter", "Massage Therapist", "Cleaner"].map(
                  (category, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-gray-300 rounded-lg"
                    >
                      <span className="font-medium text-foreground">{category}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive">
                          Delete
                        </Button>
                      </div>
                    </div>
                  ),
                )}

                <div className="pt-4 border-t border-gray-300">
                  <label className="block text-sm font-medium mb-2">Add New Category</label>
                  <div className="flex gap-2">
                    <Input placeholder="Enter category name" />
                    <Button className="bg-[#DC143C] hover:bg-red-700 text-white">Add</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
